package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{CheckOrigin: func(r *http.Request) bool { return true }}

func main() {
	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		c, err := upgrader.Upgrade(w, r, nil)
		if err != nil { log.Println(err); return }
		defer c.Close()
		for {
			mt, msg, err := c.ReadMessage()
			if err != nil { return }
			if err := c.WriteMessage(mt, msg); err != nil { return }
		}
	})
	http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) { fmt.Fprint(w, `{"ok":true}`) })
	log.Println("telemetry on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}