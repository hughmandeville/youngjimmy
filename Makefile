.PHONY: help
help:
	@echo
	@echo "install  - install files on remote web server."
	@echo "run      - start up local web server."
	@echo

.PHONY: install
## install: install files to remote server.
install:
	install.sh

.PHONY: run
## run: run local web server.
run:
	go run server.go
