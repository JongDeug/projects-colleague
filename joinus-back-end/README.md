# 남은거
## 기능
* 회의(메타버스) 연결
* 구글 api
* 관리자


## 수정 필요
### 스벨트
* 팀 상태 따라 찾기나 보기 설정 (teamService 진행중인 팀 찾기에서 processing)
### 스프링
* 회의록에 회의 참가자 명단?

## 파일 업로드 할 때 프로젝트 폴더 위치 재설정 필요 (java/web/validation/FileConst.java)
## 함수, 파일 코드
* webapp/javascripts 하위에 파일 있음
* memberFileFunctions -> 회원 프로필 사진 등록에 필요한 함수들
* teamFileFunctions -> 팀 배경화면 등록에 필요한 함수들
* mypage.updateProfile.+page, myTeam.detail.id.setting.+ps => 프론트 페이지에 적용해서 테스트해본 코드 (그대로 붙여넣으면됨)
* /api/file/download -> 서버에서 파일 가져올 때 사용, 파라미터 : type(member or team), id(회원이면 회원아이디, 팀이면 팀아이디)
* /api/file/upload -> 폼으로 사용, 사용인자 : 사진, type, id
* 팀 생성 (myTeam/create/page)에서 사진 입력 폼 지우기
* updateProfile, updateTeam 함수 조금 수정됨 (이미지 정보 담아서 주는 부분)
### 밑에는 그냥 알고만 있으면 됨
* Avatar.svelte에 src="{img}"로 설정 ( 미리보기 )
* svelte -> spring 이미지 업로드 할 때 form 말고 axios로 바꾸기
* 이미지 다운로드 (spring -> svelte) axios 안에 responseType : "blob" 하고 블롭 이미지 src로 변환해서 사용
* 팀 생성할 때 팀 이미지 추가기능 없앰