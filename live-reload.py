#!/usr/bin/env python3
"""
Simple Live Reload Tool
Watches for file changes and automatically reloads the browser
"""

import http.server
import socketserver
import webbrowser
import time
import os
import threading
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

class LiveReloadHandler(FileSystemEventHandler):
    def __init__(self, server_url):
        self.server_url = server_url
        self.browser_opened = False
        
    def on_modified(self, event):
        if event.is_directory:
            return
        if event.src_path.endswith(('.html', '.css', '.js')):
            print(f"? File changed: {event.src_path}")
            print("? Reloading browser...")
            self.reload_browser()
    
    def reload_browser(self):
        try:
            # Send reload signal to browser
            import urllib.request
            urllib.request.urlopen(f"{self.server_url}/reload")
        except:
            print("? Manual refresh needed - press Ctrl+Shift+R")

def start_server():
    PORT = 8000
    
    class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
        def do_GET(self):
            if self.path == '/reload':
                self.send_response(200)
                self.send_header('Content-type', 'text/html')
                self.end_headers()
                self.wfile.write(b'''
                <script>
                    window.location.reload(true);
                </script>
                ''')
            else:
                super().do_GET()
    
    with socketserver.TCPServer(("", PORT), CustomHTTPRequestHandler) as httpd:
        print(f"? Server running at http://localhost:{PORT}")
        print("? Watching for file changes...")
        print("? Press Ctrl+C to stop")
        
        # Open browser
        webbrowser.open(f'http://localhost:{PORT}')
        
        # Start file watcher
        event_handler = LiveReloadHandler(f'http://localhost:{PORT}')
        observer = Observer()
        observer.schedule(event_handler, path='.', recursive=True)
        observer.start()
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n? Server stopped")
            observer.stop()
        observer.join()

if __name__ == "__main__":
    start_server() 