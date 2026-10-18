# 한글 꽃밭

사물에 적힌 자음과 모음이 함께 움직이며 글자를 이루는 유아 한글 놀이입니다.

고마워 · 사랑해 · 안녕 · 같이 놀자 · 아름다워 · 즐거워 · 행복해 · 신나 · 재밌어 · 흥겨워

별도 서버나 설치 없이 GitHub Pages에서 실행할 수 있습니다. API 키나 별도의 배포 비밀번호가 필요하지 않습니다.

## GitHub에서 배포하기

1. GitHub에서 새 저장소를 만듭니다. 이름 예: `hangeul-garden`. 무료 개인 계정이라면 `Public` 저장소를 사용합니다.
2. 이 ZIP을 먼저 압축 해제한 뒤 **내용물**을 저장소 최상위에 올립니다. `index.html`이 저장소 첫 화면에서 보여야 합니다. ZIP 파일 자체나 전체 폴더를 한 단계 감싸서 올리지 마세요.
3. `.github/workflows/pages.yml`도 함께 올립니다. 자동 배포에 필요한 파일입니다. GitHub의 `Add file → Upload files`에서 압축을 푼 내용물을 올리고 변경사항을 저장합니다.
4. 저장소의 **Settings → Pages → Build and deployment → Source**를 **GitHub Actions**로 선택합니다.
5. **Actions → Deploy Hangul Garden to GitHub Pages → Run workflow**를 눌러 기본 브랜치에서 한 번 실행합니다. 처음 업로드 때 이미 자동 실행되었더라도, Pages 설정 전 실패했다면 다시 실행하면 됩니다.
6. 초록색 성공 표시가 뜨면 **Settings → Pages** 또는 실행 결과의 **github-pages** 링크로 앱을 엽니다.

주소는 보통 `https://깃허브아이디.github.io/저장소이름/` 형태입니다. 실제 주소는 GitHub Pages에 표시된 것을 사용하세요.

이후 기본 브랜치의 파일을 수정하면 자동으로 다시 배포됩니다. 다른 브랜치의 변경사항은 배포하지 않습니다.

## 웹 화면에서 자동 배포 파일을 올리기 어려운 경우

앱 파일 7개(`index.html`, `style.css`, JavaScript 파일 5개)만 저장소 최상위에 올려도 사용할 수 있습니다.
이 경우 `.github/workflows/pages.yml`은 올리지 않고, **Settings → Pages → Source: Deploy from a branch → 기본 브랜치 → /(root) → Save**를 선택합니다.

위 두 방법 중 하나만 선택하세요. 이 패키지에 포함된 자동 배포 설정을 사용하려면 첫 번째 방법을 따릅니다.

## 사용하기

원하는 말을 누르거나, ‘말해 볼래요’를 누르고 화면에 있는 말을 말해 주세요.
Chrome 또는 Edge에서 마이크 사용을 허용하면 음성 인식을 사용할 수 있습니다. 브라우저와 기기에 따라 지원이 다를 수 있으며, 말을 눌러 같은 놀이를 할 수 있습니다.

- 필요한 자모가 적힌 사물의 위치를 섞습니다.
- 10개 말, 30개 글자 장면과 단어별 완성 애니메이션을 제공합니다.
- ‘ㅝ’는 ‘ㅜ+ㅓ’, ‘ㅘ’는 ‘ㅗ+ㅏ’가 만나는 과정을 보여 줍니다.
- ‘ㅐ’는 ‘ㅐ’ 그대로 하나의 모음으로 보여 줍니다.
- 빠르기, 잠깐 멈춤, 다시 보기, 소리 켜기·끄기를 지원합니다.

앱은 이름이나 녹음 파일, 학습 기록을 저장하지 않습니다. 브라우저의 음성 인식 서비스가 음성을 처리할 수 있습니다.

## 파일 구성

- `index.html`: 시작 화면과 놀이 화면
- `style.css`: 디자인
- `art.js`: 공통 그림 표현
- `rides.js`: 아이스크림·회전그네·미끄럼틀과 모음 결합
- `objects.js`: 단어별 사물 장면
- `endings.js`: 단어별 완성 애니메이션
- `app.js`: 한글 조합, 재생, 음성 인식
- `.github/workflows/pages.yml`: GitHub Pages 자동 배포

## 배포가 안 될 때

- **404**: `index.html`이 저장소 최상위에 있는지, Actions가 성공했는지, 표시된 Pages 주소를 열었는지 확인합니다.
- **Pages 설정을 찾을 수 없음**: 저장소 관리자 권한과 계정의 Pages 지원 범위를 확인합니다.
- **자동 배포 실패**: Pages의 Source가 `GitHub Actions`인지 확인하고 Actions에서 다시 실행합니다.
- **그림이나 버튼이 안 보임**: HTML뿐 아니라 CSS와 JavaScript 파일 5개를 모두 같은 위치에 올렸는지 확인합니다.

공식 안내: [GitHub Pages 배포 방식 설정](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site), [자동 배포 작업 사용](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
