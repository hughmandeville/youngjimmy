help:
	@echo "install   - install files on remote web server."
	@echo "run_local - start up local web server."

install:
	install.sh

run_local:
	go run server.go
