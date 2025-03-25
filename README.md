# Spoteditor

사용자가 지도를 검색하여 여러 장소를 선택하고, 이미지와 설명을 추가해 하나의 ‘로그’ 단위로 발행하는 SNS 기반 웹 어플리케이션입니다.

</br>

## 📌 주요 기능

- **장소 검색 및 선택**: 카카오맵을 활용하여 사용자가 원하는 장소를 검색하고 추가할 수 있습니다.
- **로그 작성**: 선택한 장소와 함께 이미지 및 설명을 추가하여 나만의 로그를 만들 수 있습니다.
- **로그 공유**: 발행된 로그를 다른 사용자와 공유할 수 있습니다.
- **북마크 기능**: 관심 있는 장소 또는 로그를 북마크하여 쉽게 관리할 수 있습니다.

</br>

## 🖥️ 시연 영상

| 페이지 이름     | 기능 및 설명                                                                                                                                                                                                                                                                                                                                                              | 데모 영상                                                                                                                    |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **메인 페이지** | - **소셜 로그인(카카오) 지원** <br> - 로그인 필요 기능 클릭 시, **로그인 모달 표시** <br> - **메인 컨텐츠 조회** (캐러셀 & 페이지네이션 적용) <br> - **컨텐츠 업로드** <br> - **프로필 조회** <br> - **알림 조회** (팔로잉)                                                                                                                                               | **[ Desktop ]** <br> <img src="https://github.com/user-attachments/assets/c30475eb-a3b5-49f9-8a1e-d8de772ad171" width="400"> |
|                 |                                                                                                                                                                                                                                                                                                                                                                           | **[ Mobile ]** <br> <img src="https://github.com/user-attachments/assets/fe3ab2b0-9f26-4af7-89ef-90ba1ad816c8" width="200">  |
| **검색 페이지** | - **사용자 위치 동의 모달** 표시 <br> - **지역 선택**(셀렉트 박스)을 통해 해당 지역 포함 컨텐츠 검색                                                                                                                                                                                                                                                                      | **[ Desktop ]** <br> <img src="https://github.com/user-attachments/assets/21e554d6-091e-4a41-bf08-82fe5e6c896a" width="400"> |
|                 |                                                                                                                                                                                                                                                                                                                                                                           | **[ Mobile ]** <br> <img src="https://github.com/user-attachments/assets/7e692e57-bf7b-42a3-bd89-e1f6486ce8a7" width="200">  |
| **상세 페이지** | - **조회** <br> <ul><li>컨텐츠 조회</li><li>작성자 프로필로 이동</li></ul> - **북마크 기능** (개별 장소 & 전체 로그) <br> - **공유 기능** (URL 클립보드) <br> - 자신이 작성한 글일 경우, **수정 버튼 활성화**                                                                                                                                                             | **[ Desktop ]** <br> <img src="https://github.com/user-attachments/assets/d3a86dee-b6b2-4c49-83e3-93db3bc226be" width="400"> |
|                 |                                                                                                                                                                                                                                                                                                                                                                           | **[ Mobile ]** <br> ⏳                                                                                                       |
| **등록 페이지** | - **태그 등록** (누구와/어떤 분위기인지/다음에 선택 가능) <br> - **최근 지역 검색 내역** <br> - **지도 검색 (카카오맵 적용)** <br> - **로그 작성** <br> <ul><li>맵 페이지에서 선택한 장소들에 대한 설명 작성</li><li>(필수) 제목/커버이미지/로그 설명/장소 이미지 (1장 이상~3장 이하)</li><li>(선택) 개별 장소 설명</li></ul> - **작성 중 장소 추가/삭제/순서 변경 가능** | **[ Desktop ]** <br> <img src="https://github.com/user-attachments/assets/c4a34b0a-39c6-4f46-993d-6e01aa18efbe" width="400"> |
|                 |                                                                                                                                                                                                                                                                                                                                                                           | **[ Mobile ]** <br> ⏳                                                                                                       |
| **수정 페이지** | - **로그 내용 수정** <br> <ul><li>(필수) 제목/커버이미지/로그 설명/장소 이미지 (1장 이상~3장 이하)</li><li>(선택) 개별 장소 설명</li></ul>- **태그 수정**                                                                                                                                                                                                                 | **[ Desktop ]** <br> <img src="https://github.com/user-attachments/assets/6c86cfea-c45d-42b2-9a6a-81737f262e8a" width="400"> |
|                 |                                                                                                                                                                                                                                                                                                                                                                           | **[ Mobile ]** <br> ⏳                                                                                                       |
| **마이 페이지** | - **프로필 편집** <br> <ul><li>닉네임/프로필설명/프로필</li><li>계정 삭제</li></ul> - **조회** <br> <ul><li>유저가 작성한 로그</li><li>북마크 <br> - 로그 <br> - 공간</li></ul> - **컨텐츠 업로드**                                                                                                                                                                       | **[ Desktop ]** <br> ⏳                                                                                                      |
|                 |                                                                                                                                                                                                                                                                                                                                                                           | **[ Mobile ]** <br> ⏳                                                                                                       |

</br>

## 🛠️ 기술 스택

- **Frontend**: React, TailwindCSS, Shadcn
- **State management** : Zustand, Tanstack Query, React Hook Form, Zod
- **Backend**: Java
- **Database**: AWS
- **Map Service**: Kakao Maps API

</br>

## 🔥 문제 해결 및 의사결정

1. **API 성능 최적화**

   - `Promise.all`을 활용하여 의존성이 없는 API를 병렬 처리하여 응답 속도를 개선했습니다.
   - 불필요한 리렌더링을 줄이기 위해 `useState + useCallback`을 조합하여 상태 관리를 최적화했습니다.

2. **페이지 이동과 Kakao Map 초기화 문제**
   - 페이지 이동 시 Kakao Map이 매번 새로 로드되어 API 호출이 증가하는 문제를 해결하기 위해 지도 상태를 Context로 관리하도록 변경했습니다.

</br>

## 📂 폴더 구조

```
📦 src
 ┣ 📂 assets             # 정적 파일 (이미지, 아이콘 등)
 ┣ 📂 components         # 공용 컴포넌트
 ┃ ┣ 📂 Icons           # SVG 아이콘
 ┃ ┣ 📂 ui              # Shadcn UI 컴포넌트
 ┣ 📂 constants          # 상수값
 ┣ 📂 contexts           # React Context (전역 상태)
 ┣ 📂 features           # 기능별 컴포넌트
 ┣ 📂 hooks              # 커스텀 훅
 ┃ ┣ 📂 mutations       # useMutation 관련
 ┃ ┃ ┣ 📜 useFollowingMutation.ts
 ┃ ┃ ┗ 📜 useUnfollowMutation.ts
 ┃ ┃ ┗ ...
 ┃ ┣ 📂 queries         # useQuery 관련
 ┃ ┃ ┣ 📜 followQueryKeys.ts
 ┃ ┃ ┣ ...
 ┃ ┣ ...             # 그 외 커스텀 훅
 ┣ 📂 layouts            # 레이아웃 컴포넌트
 ┣ 📂 pages              # 페이지 컴포넌트
 ┃ ┣ 📂 components      # 해당 페이지 전용 컴포넌트
 ┣ 📂 routes             # 라우팅 관련 (protected route 등)
 ┣ 📂 services           # API 호출 및 데이터 처리
 ┃ ┣ 📂 apis            # axios 인스턴스 및 API
 ┃ ┃ ┣ 📂 types         # API 전용 타입
 ┃ ┃ ┣ 📜 authApi.ts
 ┃ ┃ ┣ 📜 registerApi.ts
 ┃ ┃ ┣ ...
 ┃ ┣ 📂 schemas         # Zod 스키마
 ┣ 📂 store              # 클라이언트 상태 스토어 (모달, UI)
 ┣ 📂 types              # 글로벌 타입
 ┣ 📂 utils              # 유틸 함수들
```

</br>

## 🚀 실행 방법

```bash
# 1. 프로젝트 클론
git clone https://github.com/your-repo/spoteditor.git

# 2. 의존성 설치
cd spoteditor
yarn install

# 3. 환경 변수 설정 (.env 파일)
VITE_API_BASE_URL='백엔드 경로'
VITE_KAKAO_LOGIN_URL='kakao key'
VITE_KAKAO_MAP_KEY = 'kakao map key'
VITE_CLOUDE_FRONT= 'aws cloude front 경로'

# 4. 로컬 서버 실행
yarn start
```
