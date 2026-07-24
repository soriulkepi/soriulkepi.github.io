# C&G EPI Lab — 연구실 홈페이지

임상·유전역학연구실 (Clinical & Genetic Epidemiology Lab)
강원대학교 의과대학 예방의학교실

디자인: **Night Trace** (수면 뇌파 모티프 · 딥 인디고)

---

## 1. 파일 구조

```
cg-epi-lab/
├── index.html          홈 (Hero + 연구 3축 + 대표 논문 + 모집 CTA)
├── research.html       연구 (4개 트랙 + 코호트·데이터·협력)
├── publications.html   논문 (연도별 전체 목록 + 저서)
├── people.html         구성원 (PI 소개·경력 + 멤버 슬롯 + 공동연구자)
├── join.html           모집 (소구점 + 모집대상 3종 + 지원방법)
├── contact.html        연락처 (이메일·주소·지도 자리)
├── assets/
│   ├── style.css       전체 스타일 (디자인 토큰 포함)
│   └── main.js         모바일 메뉴 토글
└── README.md
```

빌드 도구가 필요 없는 **순수 정적 사이트**입니다. HTML을 직접 수정하면 바로 반영됩니다.

---

## 2. 로컬에서 미리보기

폴더의 `index.html`을 브라우저로 열면 됩니다. 또는 터미널에서:

```bash
cd cg-epi-lab
python3 -m http.server 8000
# 브라우저에서 http://localhost:8000 접속
```

---

## 3. GitHub Pages 배포 (무료)

GitHub 계정: **soriulkepi**

### 권장: 저장소 이름을 `soriulkepi.github.io` 로 만들기
이렇게 하면 주소가 `https://soriulkepi.github.io/` 로 깔끔하게 나옵니다.
(다른 이름으로 만들면 `https://soriulkepi.github.io/저장소이름/` 형태가 됩니다.)

1. GitHub 로그인 → **New repository** → 이름 `soriulkepi.github.io` → Public → Create
2. 이 폴더의 **내용물 전체**를 저장소에 업로드
   - 웹에서: 저장소 → **Add file → Upload files** → 파일 전체 드래그 → Commit
   - 또는 터미널에서:
     ```bash
     cd cg-epi-lab
     git init
     git add .
     git commit -m "Launch C&G EPI Lab site"
     git branch -M main
     git remote add origin https://github.com/soriulkepi/soriulkepi.github.io.git
     git push -u origin main
     ```
3. 저장소 → **Settings → Pages**
4. **Source**: `Deploy from a branch` / **Branch**: `main` / **Folder**: `/ (root)` → Save
5. 1~2분 후 `https://soriulkepi.github.io/` 로 공개됩니다.

> `cg-epi-lab.zip` 을 받으셨다면 압축을 푼 뒤 **폴더 안의 파일들**을 올리세요.
> `cg-epi-lab` 폴더째로 올리면 주소에 폴더명이 한 단계 더 붙습니다.

### 커스텀 도메인 (선택)
학교 도메인을 받으실 수 있으면 Settings → Pages → Custom domain에 입력하고,
도메인 DNS에 CNAME 레코드(`soriulkepi.github.io`)를 등록하면 됩니다.

---

## 3-1. PI 사진 넣기 (필수 1단계)

사이트는 `assets/pi.jpg` 를 PI 사진으로 표시합니다. 파일이 없으면 자리표시자가 나옵니다.

1. Google Scholar 프로필(`https://scholar.google.com/citations?user=LuosXZ0AAAAJ&hl=ko`) 접속
2. 프로필 사진 우클릭 → **이미지를 다른 이름으로 저장**
3. 파일명을 **`pi.jpg`** 로 바꿔 `assets/` 폴더에 넣기

정사각형(예: 600×600px)에 가깝게 잘라두면 가장 예쁘게 표시됩니다.
Scholar 사진은 해상도가 낮을 수 있으니, 더 좋은 원본이 있으시면 그 파일을 `pi.jpg` 로 쓰시길 권합니다.

---

## 4. 반영 완료 / 남은 항목

### 반영 완료
- 주소: **집현관 B102-6호**, 강원대학교 의과대학 예방의학교실 (contact.html, 전 페이지 footer)
- 전화: 033-250-8869
- ORCID: `0000-0002-6161-1636` → https://orcid.org/0000-0002-6161-1636
- Google Scholar, GitHub(soriulkepi) 링크 — People / Publications / Contact / footer
- 지도 임베드 (Google Maps, 다크 테마에 맞춰 반전 처리)

### 남은 항목
파일에서 `todo` 또는 대괄호 `[ ]` 를 검색하면 찾을 수 있습니다.

| 위치 | 내용 |
|---|---|
| `assets/pi.jpg` | **PI 사진 파일** (위 3-1 참조) |
| `research.html` | **수행 과제명·재원·기간** (현재 예시 텍스트 상태) |
| `join.html` | 모집 **인원·시기·자격요건·처우** |
| `people.html` | 대학원생·연구원 정보 (모집 후 추가) |

---

## 5. 자주 하는 수정

**논문 추가** — `publications.html`에서 아래 블록을 복사해 해당 연도 아래에 추가:
```html
<div class="pub">
  <p class="authors">저자</p>
  <p class="title">제목</p>
  <p class="venue"><b>저널명</b> · 권(호):페이지</p>
</div>
```
공동 제1저자는 제목 끝에 `<span class="flag">co-first</span>` 를 붙이면 배지가 표시됩니다.

**구성원 추가** — `people.html`의 `.slot` 블록을 아래로 교체:
```html
<article class="card" style="--ch:#5fd4bb">
  <span class="ch">PhD student</span>
  <h3>이름</h3>
  <h4 lang="ko">학위과정</h4>
  <p>연구주제 한 줄</p>
</article>
```

**색상 변경** — `assets/style.css` 최상단 `:root` 의 변수만 고치면 전체에 반영됩니다.

---

## 6. 주의사항

- **민감정보 금지**: KoGES 등 코호트의 개인식별 가능 자료, IRB 승인 범위 데이터는 이 저장소에 절대 올리지 마세요. GitHub는 공개 저장소입니다.
- **강의자료 공개**: KMLE 등 시험·강의 콘텐츠를 게시할 경우 저작권·보안을 확인하세요.
- **논문 목록 근거**: 현재 게시된 목록은 제공해 주신 CV(2026) 기준입니다. 최신 논문은 직접 추가하시거나 ORCID 연동을 권장합니다.
