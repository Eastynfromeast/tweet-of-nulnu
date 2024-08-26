# 리액트 10주 챌린지 캐럿마켓 졸작

[배포 링크](https://tweet-of-nulnu.vercel.app/)

## Search & Profile & Deployment 🔥

### Goal

- Implement the `/search` page where users should be able to search for tweets by keyword.
- Implement the `/users/[username]` page to display the profile of a user and the Tweets the user has posted.
- If the user is the owner of the profile show a link to the `/users/[username]/edit` page.
- In the edit profile page the user should be able to edit the username, email, bio and change password.
- Use Zod, Server Actions, `useOptimistic` and `revalidatePath`.
- Deploy to Vercel and Vercel Postgres after watching [**this section**](https://nomadcoders.co/carrot-market/lectures/4869).
- 제출하는 링크가 반드시 vercel.app 로 끝나야 정상 제출 됩니다!

### 추가 구현 필요 사항

과제 요구 조건은 아니었지만 개인적으로 추가하고 싶은 기능들 리스트

- [ ] TweetListItem 좋아요 버튼 추가 + action 추가
- [ ] `tweet/[id]` 페이지 isUser → 삭제 버튼 추가
- [ ] 보다 완벽한 페이지네이션 구현 : 보여줄 페이지 수 설정, 페이지네이션 컴포넌트 빼기
- [ ] `tweet/[id]` 페이지 user → edit 버튼 추가
- [ ] 트윗 댓글 무한 스크롤?
