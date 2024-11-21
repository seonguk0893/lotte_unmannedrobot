# 롯데아울렛 자율주행(안내) 점원 무인로봇
## Flask & Node.js & MySQL
[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fseonguk0893%2Fumannedrobot_web.git&count_bg=%232D97BC&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=%EB%B0%A9%EB%AC%B8%EC%9E%90%EC%88%98&edge_flat=true)](https://hits.seeyoufarm.com)

<br>


## 🚀Skills

![flask](https://img.shields.io/badge/flask-35495E?style=for-the-badge&logo=flask&logoColor=4FC08D) ![node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) ![mysql](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white) ![html](https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![css](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=seonguk0893&layout=compact)](https://github.com/seonguk0893/github-readme-stats)

<br>

## 실행 명령어

```
cd app

python main.py
```


* html, css, js 이외의 코드와 요소들은 올리지 않았습니다.(main.py, img파일, csv파일 등) 

<br> 

## 페이지 및 기능 설명

### HOME 화면
  - 매장찾기, 음성인식을 통한 매장찾기 2개의 페이지로 구성

<img width="500" alt="image" src="https://github.com/user-attachments/assets/54669b29-ee50-45f3-950c-e15698437248">


### 매장찾기 페이지
  - 1,2층 매장 리스트가 나열되어 있고 매장을 클릭하면 매장위치와 안내시작을 할 수 있는 모달이 뜸
  - 안내시작을 누를 경우 로봇 이동경로 중 안내매장과 가장 가까운 매장으로 안내
  - 안내하는 동안 안내중 문구가 뜨며 화면 터치 불가
  - 안내가 완료되면 상세하게 매장을 안내해주는 음성출력 구현(방향 제시)

<img width="1201" alt="image" src="https://github.com/user-attachments/assets/400dc82a-483e-4eee-8a29-f23558f7ea4c">
<img width="500" alt="image" src="https://github.com/user-attachments/assets/e64c78b1-6432-4f5e-ae54-2d25a8042147">
<img width="500" alt="image" src="https://github.com/user-attachments/assets/b419f7aa-dcb8-4957-9b84-5ebcf78c1266">


### 음성인식 페이지
  - 마이크 버튼으로 매장명을 말하면 매장찾기 페이지와 동일하게 모달이 뜸
  - 매장찾기와 그 다음은 동일
  - 매장지도를 통해 1,2층 아울렛 안내도를 확인

<img width="500" alt="image" src="https://github.com/user-attachments/assets/c0d266fc-53e1-4c04-9afb-fdfaf4d02c7f">
<img width="500" alt="image" src="https://github.com/user-attachments/assets/280c2e7f-4a0a-4aba-91ee-7784b1412815">

