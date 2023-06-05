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
* Avatar.svelte에 src="{img}"로 설정 ( 미리보기 )
* svelte -> spring 이미지 업로드 할 때 form 말고 axios로 바꾸기
* 이미지 다운로드 (spring -> svelte) axios 안에 responseType : "blob" 하고 블롭 이미지 src로 변환해서 사용
* 팀 생성에 팀이미지 없앰