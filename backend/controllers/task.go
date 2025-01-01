package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/neo4j/neo4j-go-driver/v4/neo4j"
)

var driver neo4j.Driver

type Task struct {
	ID       string `json:"id"`
	Title    string `json:"title"`
	Completed bool   `json:"completed"`
}

func GetTasks(c *gin.Context) {
	session := driver.NewSession(neo4j.SessionConfig{AccessMode: neo4j.AccessModeRead})
	defer session.Close()

	userID := c.DefaultQuery("user_id", "default_user")

	result, err := session.Run(
		"MATCH (u:User)-[:HAS_TASK]->(t:Task) WHERE u.id = $user_id RETURN t",
		map[string]interface{}{"user_id": userID},
	)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	var tasks []Task
	for result.Next() {
		record := result.Record()
		taskNode := record.GetByIndex(0).(neo4j.Node)

		task := Task{
			ID:        taskNode.Id().String(),
			Title:     taskNode.Props()["title"].(string),
			Completed: taskNode.Props()["completed"].(bool),
		}
		tasks = append(tasks, task)
	}

	c.JSON(http.StatusOK, tasks)
}

func AddTask(c *gin.Context) {
	var task Task
	if err := c.ShouldBindJSON(&task); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	session := driver.NewSession(neo4j.SessionConfig{AccessMode: neo4j.AccessModeWrite})
	defer session.Close()

	userID := c.DefaultQuery("user_id", "default_user")

	_, err := session.Run(
		"MERGE (u:User {id: $user_id}) "+
			"CREATE (u)-[:HAS_TASK]->(t:Task {title: $title, completed: $completed})",
		map[string]interface{}{
			"user_id":  userID,
			"title":    task.Title,
			"completed": task.Completed,
		},
	)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Task added successfully"})
}

func UpdateTaskStatus(c *gin.Context) {
	taskID := c.Param("id")
	var status struct {
		Completed bool `json:"completed"`
	}

	if err := c.ShouldBindJSON(&status); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	session := driver.NewSession(neo4j.SessionConfig{AccessMode: neo4j.AccessModeWrite})
	defer session.Close()

	_, err := session.Run(
		"MATCH (t:Task) WHERE ID(t) = $task_id SET t.completed = $completed",
		map[string]interface{}{
			"task_id":  taskID,
			"completed": status.Completed,
		},
	)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Task updated successfully"})
}

func DeleteTask(c *gin.Context) {
	taskID := c.Param("id")

	session := driver.NewSession(neo4j.SessionConfig{AccessMode: neo4j.AccessModeWrite})
	defer session.Close()

	_, err := session.Run(
		"MATCH (t:Task) WHERE ID(t) = $task_id DELETE t",
		map[string]interface{}{"task_id": taskID},
	)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Task deleted successfully"})
} 
