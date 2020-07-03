help:
	echo "install   - install files on remote web server."
	echo "run_local - start up local web server."

install:
	install.sh

run_local:
	echo "http://localhost:8080/"
	python -m SimpleHTTPServer 8080
