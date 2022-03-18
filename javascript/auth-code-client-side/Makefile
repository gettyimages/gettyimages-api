default: run

run:
	docker run -d -v ${PWD}:/usr/share/nginx/html --name nginx-authcode --rm -p 8080:80 nginx:mainline-alpine

stop:
	docker stop nginx-authcode
