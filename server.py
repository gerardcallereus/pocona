import http.server
import socketserver
import sys

class NoCacheHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Desactivar completament la memòria cau del navegador per a desenvolupament
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

socketserver.TCPServer.allow_reuse_address = True

target_port = 8000
if len(sys.argv) > 1:
    try:
        target_port = int(sys.argv[1])
    except ValueError:
        pass

candidate_ports = [target_port, 8080, 8001, 8002, 8081]
candidate_ports = list(dict.fromkeys(candidate_ports))

for port in candidate_ports:
    try:
        with socketserver.TCPServer(("", port), NoCacheHTTPRequestHandler) as httpd:
            print(f"Servidor actiu a http://localhost:{port} (sense cache)")
            httpd.serve_forever()
            break
    except OSError as e:
        if e.errno == 98:  # Address already in use
            continue
        raise
