# 잃어버렸다면? 주움하세요!(zu_um) :boom:

<img width="1439" alt="image" src="https://github.com/user-attachments/assets/e665f11b-0036-4b34-83b3-785f049d5707" />

- 배포 URL : https://lostnfoundservice.netlify.app/

<br>

## 프로젝트 소개

**😨: “어? 내 지갑 어디 갔지?!”**

**🙄: “지갑을 주웠는데… 어떻게 돌려줘야 하지?”**

분실물을 발견했거나 소중한 물건을 잃어버려 당황한 적이 있으신가요?

습득한 사람에겐 간편한 반환 방법을,

잃어버린 사람에겐 반드시 되찾을 거라는 믿음을 드릴게요.

<br>

## 프로젝트 기간

25.01.25 ~ 25.02.21

<br>

## Pickle 팀원 구성

| 기획자 | 디자이너 | 프론트엔드 개발자 | 프론트엔드 개발자 | 백엔드 개발자 | 백엔드 개발자 |
| :----: | :------: | :---------------: | :---------------: | :-----------: | :-----------: |
| 이선유 |  김채원  |      한규호       |      박서연       |    여지현     |    권혁민     |

<br />

## 프론트엔드 개발자들의 개인 깃허브

|                                                                                        **한규호**                                                                                        |                                                                                         **박서연**                                                                                         |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| [@Gyuho-Han](https://github.com/Gyuho-Han) | [<img src="https://github.com/user-attachments/assets/bc729a7c-8f65-41c0-86bb-9287e123477f" height=160 width=160> <br/> @yeji](https://github.com/skwldwld) |


</div>

<br>

## 개발 환경

- Front : HTML, React, styled-components, prettier
- 버전 및 이슈관리 : Github, Github Issues
- 협업 툴 : Discord, Notion, Figma
- 서비스 배포 환경 : Netlify
  
#  🦁 잃어버렸다면? 주움(Zuum)하세요!

## Git Task Cycle ♼
멋쟁이사자처럼 한동대학교의 구성원은 아래와 같은 컨벤션을 따릅니다. 업데이트 하고 싶은 내용이 있다면 Pull Requests 바랍니다. 

## 동물농장 사이트
https://lostnfoundservice.netlify.app/
<br />
<br />

## 1. 이슈 작성하기

✹ **Git Issue 사용법**

- 작업할 기능에 대한 issue를 작성합니다.
- issue 제목은 **[타입] - 설명**으로 통일합니다. (ex. [Style] - 텍스트 스타일 추가)
- Assignees에는 작업을 맡은 사람을 태그합니다.
- Labels에는 해당 작업과 맞는 유형을 태그합니다.
- 설명란에는 어떤 작업을 할 예정인지, 관련된 이슈번호가 있는지 참고한 내용이 있는지 등 필요한 내용을 적습니다.
- 이렇게 issue를 생성하게 되면 #N의 이슈 번호가 생깁니다.
<br />
<br />

## 2. 브랜치 만들기

✹  **Git Branch 사용법**

- 각자 생성한 브랜치에서만 작업합니다. (브랜치 생성은 Issue 사용법 참고)
- 브랜치 이름 구조는 <**본인이름_타입/#이슈번호**> 입니다. (ex. haeun_feat/#1)
<br />
<br />

## 3. checkout 해서 브랜치 변경 (중요!! 🧠🫀🧨)

```bash
git checkout haeun_feat/#1
```
<br />
<br />

## 4. 작업

- 작업합니다
- 테스크 단위로 커밋합니다
- pull request를 통해 본인이 작업한 branch를 develop branch에 merge합니다.
- 코드 리뷰한 후 머지하기 (1명 혹은 2명, 개발 팀장을 정해도 좋아요.)

✹  Commit 메시지 작성법

```bash
타입 : 짧은 내용(한글로)
feat : 로그인
ex)style : 텍스트 디자인시스템 구축
```

|  |  |  |
| --- | --- | --- |
| type | Description | Example |
| feat | 새로운 기능 추가, 구현 | feat : 로그인 기능 구현 |
| edit | 단순 오타 수정 | edit : 로그인 캐시 처리 방식 수정 |
| style | UI작업, 스타일 관련 파일 추가 및 수정 | style : 폰트 등록 |
| add | asset 파일(이미지, 아이콘 등) 추가 | add : 위젯 이미지 추가 |
| chore | 파일, 경로를 옮기거나 이름 변경 | chore : feet -> feat 이름 변경 |
| delete | 덤프 파일 삭제 | delete : Empty.md 파일 삭제 |
| merge | 브랜치 병합(merge) | merge : pull request #3 from LikeLionHGU/Haeun_Style/#1 |
| fix | 버그 픽스 | fix : Color 버그 수정 |
| docs | 문서 작업 | docs : Readme 작성 |
| refactor | 코드 리팩토링 | refactor : 변수명 수정 |
| model | 데이터베이스(모델) 작업 | model : 데이터 모델 생성 |
| init | 프로젝트 생성 | init : 프로젝트 생성 |
| test | 테스트 케이스 생성 | test: 테스트 케이스 생성 |
| 빌드관련 |  |  |  
| build | 재빌드 | build: 동일버전 재빌드(x.xx) |
| version | 버전 업 | version : 버전(2.0.0) 업데이트 |



✹  Pull Request 제목 작성법

이름_타입/#이슈번호 → 풀 시킬 브랜치 (ex. Hani_Style/#1 -> dev)


작성자: @chamroro


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


