// /constants/INTERVIEW_QUESTIONS.js
export const INTERVIEW_QUESTIONS = {
  frontend: {
    beginner: {
      questionsId: 1,
      questions: [
        {
          id: "1",
          keyword: ["HTML", "시맨틱태그"],
          content:
            "HTML의 시맨틱 태그가 무엇인지 설명하고, 사용하는 이유에 대해 말씀해주세요.",
        },
        {
          id: "2",
          keyword: ["CSS", "박스모델"],
          content:
            "CSS 박스 모델에 대해 설명하고, margin과 padding의 차이점을 말씀해주세요.",
        },
        {
          id: "3",
          keyword: ["JavaScript", "호이스팅"],
          content:
            "JavaScript의 호이스팅(Hoisting)이 무엇인지 설명하고 예시를 들어주세요.",
        },
        {
          id: "4",
          keyword: ["React", "컴포넌트"],
          content:
            "React에서 함수형 컴포넌트와 클래스형 컴포넌트의 차이점을 설명해주세요.",
        },
        {
          id: "5",
          keyword: ["웹접근성", "크로스브라우징"],
          content:
            "웹 접근성과 크로스 브라우징이 무엇인지 설명하고, 왜 중요한지 말씀해주세요.",
        },
      ],
    },
    intermediate: {
      questionsId: 2,
      questions: [
        {
          id: "1",
          keyword: ["JavaScript", "클로저"],
          content:
            "JavaScript의 클로저(Closure)에 대해 설명하고, 실제 사용 예시를 들어주세요.",
        },
        {
          id: "2",
          keyword: ["React", "상태관리", "Redux"],
          content:
            "React에서 상태 관리가 왜 중요한지 설명하고, Redux와 Context API의 차이점을 말씀해주세요.",
        },
        {
          id: "3",
          keyword: ["성능최적화", "메모이제이션"],
          content:
            "React에서 성능 최적화를 위해 사용할 수 있는 방법들을 설명해주세요.",
        },
        {
          id: "4",
          keyword: ["웹팩", "번들링"],
          content:
            "모듈 번들러가 무엇인지 설명하고, Webpack과 Vite의 차이점을 말씀해주세요.",
        },
        {
          id: "5",
          keyword: ["타입스크립트", "타입시스템"],
          content:
            "TypeScript를 사용하는 이유와 JavaScript 대비 장단점을 설명해주세요.",
        },
      ],
    },
    advanced: {
      questionsId: 3,
      questions: [
        {
          id: "1",
          keyword: ["아키텍처", "마이크로프론트엔드"],
          content:
            "마이크로 프론트엔드 아키텍처에 대해 설명하고, 언제 사용하는 것이 적절한지 말씀해주세요.",
        },
        {
          id: "2",
          keyword: ["성능", "렌더링최적화"],
          content:
            "브라우저 렌더링 과정을 설명하고, Critical Rendering Path 최적화 방법을 말씀해주세요.",
        },
        {
          id: "3",
          keyword: ["보안", "XSS", "CSRF"],
          content:
            "웹 애플리케이션에서 XSS와 CSRF 공격을 방어하는 방법을 설명해주세요.",
        },
        {
          id: "4",
          keyword: ["테스팅", "E2E", "단위테스트"],
          content:
            "프론트엔드에서 테스트 전략을 수립할 때 고려해야 할 사항들을 설명해주세요.",
        },
        {
          id: "5",
          keyword: ["PWA", "서비스워커"],
          content:
            "Progressive Web App(PWA)의 핵심 기술들을 설명하고 구현 시 주의사항을 말씀해주세요.",
        },
      ],
    },
  },
  backend: {
    beginner: {
      questionsId: 4,
      questions: [
        {
          id: "1",
          keyword: ["HTTP", "RESTful API"],
          content:
            "HTTP 메서드들의 특징을 설명하고, RESTful API 설계 원칙을 말씀해주세요.",
        },
        {
          id: "2",
          keyword: ["데이터베이스", "SQL"],
          content:
            "관계형 데이터베이스의 정규화가 무엇인지 설명하고, 왜 필요한지 말씀해주세요.",
        },
        {
          id: "3",
          keyword: ["서버", "클라이언트"],
          content:
            "클라이언트-서버 아키텍처에 대해 설명하고, 장단점을 말씀해주세요.",
        },
        {
          id: "4",
          keyword: ["Node.js", "비동기"],
          content: "Node.js의 이벤트 루프와 비동기 처리 방식을 설명해주세요.",
        },
        {
          id: "5",
          keyword: ["인증", "세션", "쿠키"],
          content: "웹에서 사용자 인증 방식인 세션과 쿠키에 대해 설명해주세요.",
        },
      ],
    },
    intermediate: {
      questionsId: 5,
      questions: [
        {
          id: "1",
          keyword: ["데이터베이스", "인덱스", "최적화"],
          content:
            "데이터베이스 인덱스의 동작 원리와 성능 최적화 방법을 설명해주세요.",
        },
        {
          id: "2",
          keyword: ["캐싱", "Redis", "메모리"],
          content: "캐싱 전략과 Redis를 활용한 성능 개선 방법을 설명해주세요.",
        },
        {
          id: "3",
          keyword: ["API", "버전관리", "문서화"],
          content:
            "API 버전 관리 전략과 효과적인 API 문서화 방법을 설명해주세요.",
        },
        {
          id: "4",
          keyword: ["보안", "JWT", "OAuth"],
          content:
            "JWT와 OAuth를 활용한 인증/인가 시스템 구현 방법을 설명해주세요.",
        },
        {
          id: "5",
          keyword: ["트랜잭션", "ACID", "동시성"],
          content:
            "데이터베이스 트랜잭션의 ACID 속성과 동시성 제어 방법을 설명해주세요.",
        },
      ],
    },
    advanced: {
      questionsId: 6,
      questions: [
        {
          id: "1",
          keyword: ["마이크로서비스", "분산시스템"],
          content:
            "마이크로서비스 아키텍처의 장단점과 분산 시스템에서 고려해야 할 사항들을 설명해주세요.",
        },
        {
          id: "2",
          keyword: ["로드밸런싱", "스케일링"],
          content:
            "대용량 트래픽 처리를 위한 로드 밸런싱과 확장성 설계 방법을 설명해주세요.",
        },
        {
          id: "3",
          keyword: ["메시지큐", "이벤트드리븐"],
          content:
            "이벤트 드리븐 아키텍처와 메시지 큐를 활용한 시스템 설계를 설명해주세요.",
        },
        {
          id: "4",
          keyword: ["모니터링", "로깅", "알림"],
          content:
            "분산 시스템에서 효과적인 모니터링과 로깅 전략을 설명해주세요.",
        },
        {
          id: "5",
          keyword: ["DevOps", "CI/CD", "배포전략"],
          content:
            "무중단 배포를 위한 CI/CD 파이프라인과 배포 전략을 설명해주세요.",
        },
      ],
    },
  },
  devops: {
    beginner: {
      questionsId: 7,
      questions: [
        {
          id: "1",
          keyword: ["Linux", "명령어"],
          content:
            "Linux 기본 명령어들과 파일 시스템 구조에 대해 설명해주세요.",
        },
        {
          id: "2",
          keyword: ["Docker", "컨테이너"],
          content:
            "Docker와 컨테이너 기술이 무엇인지 설명하고, 가상머신과의 차이점을 말씀해주세요.",
        },
        {
          id: "3",
          keyword: ["Git", "버전관리"],
          content: "Git의 기본 워크플로우와 브랜치 전략에 대해 설명해주세요.",
        },
        {
          id: "4",
          keyword: ["네트워크", "HTTP", "DNS"],
          content: "웹 서비스에서 HTTP 통신과 DNS의 역할에 대해 설명해주세요.",
        },
        {
          id: "5",
          keyword: ["서버", "인프라", "클라우드"],
          content:
            "온프레미스와 클라우드 인프라의 차이점과 각각의 장단점을 설명해주세요.",
        },
      ],
    },
  },
  android: {
    beginner: {
      questionsId: 8,
      questions: [
        {
          id: "1",
          keyword: ["Android", "Activity", "생명주기"],
          content:
            "Android Activity의 생명주기에 대해 설명하고, 각 단계에서 수행해야 할 작업을 말씀해주세요.",
        },
        {
          id: "2",
          keyword: ["Layout", "View", "ViewGroup"],
          content:
            "Android에서 View와 ViewGroup의 차이점과 주요 Layout 종류를 설명해주세요.",
        },
        {
          id: "3",
          keyword: ["Intent", "데이터전달"],
          content:
            "Android Intent의 역할과 Activity 간 데이터 전달 방법을 설명해주세요.",
        },
        {
          id: "4",
          keyword: ["Fragment", "UI"],
          content:
            "Fragment가 무엇인지 설명하고, Activity와의 차이점을 말씀해주세요.",
        },
        {
          id: "5",
          keyword: ["권한", "Permission"],
          content:
            "Android 앱에서 권한 처리 방법과 런타임 권한의 중요성을 설명해주세요.",
        },
      ],
    },
  },
  ios: {
    beginner: {
      questionsId: 9,
      questions: [
        {
          id: "1",
          keyword: ["iOS", "ViewController", "생명주기"],
          content:
            "iOS ViewController의 생명주기에 대해 설명하고, 각 단계의 특징을 말씀해주세요.",
        },
        {
          id: "2",
          keyword: ["Swift", "Objective-C"],
          content:
            "Swift와 Objective-C의 차이점과 Swift의 주요 특징을 설명해주세요.",
        },
        {
          id: "3",
          keyword: ["AutoLayout", "Constraints"],
          content:
            "iOS에서 AutoLayout과 Constraints를 사용하는 이유와 방법을 설명해주세요.",
        },
        {
          id: "4",
          keyword: ["Delegate", "Protocol"],
          content:
            "iOS에서 Delegate 패턴과 Protocol의 역할에 대해 설명해주세요.",
        },
        {
          id: "5",
          keyword: ["MVC", "MVVM", "아키텍처"],
          content:
            "iOS 앱 개발에서 사용되는 아키텍처 패턴들을 비교해서 설명해주세요.",
        },
      ],
    },
  },
};
export default INTERVIEW_QUESTIONS;
