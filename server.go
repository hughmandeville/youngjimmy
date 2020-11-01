package main

import (
	"fmt"
	"net/http"
)

func main() {
	http.HandleFunc("/bio", handleIndex)
	http.HandleFunc("/music", handleIndex)
	http.HandleFunc("/shows", handleIndex)
	http.HandleFunc("/merch", handleIndex)
	http.HandleFunc("/press", handleIndex)
	fs := http.FileServer(http.Dir("./"))
	http.Handle("/", fs)
	fmt.Printf("http://localhost:8080/\n")
	http.ListenAndServe(":8080", nil)
}
func handleIndex(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "index.html")
}
