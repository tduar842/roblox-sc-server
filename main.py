import pyautogui
from PIL import Image
import json
import requests
import time
import math as m

url = "https://roblox-sc-server.onrender.com/data"
url_input = "https://roblox-sc-server.onrender.com/remote_inp"

headers = {
    "Content-Type": "application/json"
}

scale = 58

wait_time = 0.5

def recieve_input():
    response = requests.get(url=url_input)
    data = response.json()
    print(response.json())
    if data:
        if data["action"] == "Mouse1":
            pyautogui.click(data["x"], data["y"])
            
        if data["action"] == "Mouse2":
            pyautogui.rightClick(data["x"], data["y"])

        if data["action"] == "ArrowUp":
            pyautogui.press("up")
            
        if data["action"] == "ArrowDown":
            pyautogui.press("down")

        if data["action"] == "ArrowLeft":
            pyautogui.press("left")
            
        if data["action"] == "ArrowRight":
            pyautogui.press("right")
                                                

def send_data(json_data):
    response = requests.post(url=url, json=json_data)
    print("status code: ", response.status_code)
    print("response: ", response.text)

def generate_screen_data(screenshot):
    final_data = []
    for x in range(scale):
        for y in range(scale):
            r, g, b = screenshot.getpixel((x, y))
            data = {
                "r" : m.floor((r/255)*100),
                "g" : m.floor((g/255)*100),
                "b" : m.floor((b/255)*100)
            }
            final_data.append(data)
    #print(json.dumps(final_data))

    send_data(final_data)

while True:
    time.sleep(wait_time)
    # Capture the screen
    screenshot = pyautogui.screenshot()

    # Downscale the image
    screenshot = screenshot.transpose(Image.FLIP_TOP_BOTTOM)
    downscaled = screenshot.resize((scale, scale))

    generate_screen_data(downscaled)

    recieve_input()    

