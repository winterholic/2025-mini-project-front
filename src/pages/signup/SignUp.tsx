import { useState, FormEvent } from 'react';
import styled from 'styled-components';
import { media } from '../../styles/media';

const SignUpPageWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans KR', sans-serif;
`;

const SignUpCard = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 500px;
  overflow: hidden;
`;

const SignUpHeader = styled.div`
  background: #fff;
  padding: 2rem;
  text-align: center;
  border-bottom: 1px solid #f0f0f0;

  ${media.tablet`
    padding: 2.5rem;
  `}
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 1rem;
`;

const LogoImage = styled.img`
  border-radius: 8px;
`;

const LogoText = styled.h1`
  font-size: 28px;
  font-weight: 800;
  color: #111827;
  margin: 0;
`;

const SignUpTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
  margin: 0;

  ${media.tablet`
    font-size: 1.5rem;
  `}
`;

const SignUpForm = styled.form`
  padding: 2rem;

  ${media.tablet`
    padding: 2.5rem;
  `}
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
`;

const InputWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  transition: all 0.2s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }

  &:disabled {
    background-color: #f9fafb;
    cursor: not-allowed;
  }
`;

const SmallButton = styled.button`
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(102, 126, 234, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const SuccessMessage = styled.div`
  font-size: 0.75rem;
  color: #059669;
  margin-top: 0.25rem;
`;

const ErrorMessage = styled.div`
  font-size: 0.75rem;
  color: #dc2626;
  margin-top: 0.25rem;
`;

const SignUpButton = styled.button`
  width: 100%;
  padding: 0.875rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 1rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const BackToLoginButton = styled.button`
  width: 100%;
  padding: 0.875rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: #667eea;
  background: #fff;
  border: 2px solid #667eea;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 1rem;

  &:hover {
    background: #f3f4f6;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const SignUp = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [email, setEmail] = useState('');

  const [isUserIdChecked, setIsUserIdChecked] = useState(false);
  const [isUserIdAvailable, setIsUserIdAvailable] = useState(false);
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [isEmailAvailable, setIsEmailAvailable] = useState(false);

  const [userIdMessage, setUserIdMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [emailMessage, setEmailMessage] = useState('');

  const handleUserIdCheck = () => {
    if (!userId) {
      setUserIdMessage('아이디를 입력해주세요.');
      setIsUserIdChecked(false);
      setIsUserIdAvailable(false);
      return;
    }

    // 아이디 유효성 검사 (4~20자, 영문+숫자)
    const userIdRegex = /^[a-zA-Z0-9]{4,20}$/;
    if (!userIdRegex.test(userId)) {
      setUserIdMessage('아이디는 4~20자의 영문, 숫자만 사용 가능합니다.');
      setIsUserIdChecked(false);
      setIsUserIdAvailable(false);
      return;
    }

    // 임시로 'admin', 'test', 'user'는 이미 사용 중인 아이디로 처리
    const unavailableIds = ['admin', 'test', 'user'];
    if (unavailableIds.includes(userId.toLowerCase())) {
      setUserIdMessage('이미 사용 중인 아이디입니다.');
      setIsUserIdChecked(true);
      setIsUserIdAvailable(false);
    } else {
      setUserIdMessage('사용 가능한 아이디입니다.');
      setIsUserIdChecked(true);
      setIsUserIdAvailable(true);
    }
  };

  const handleEmailCheck = () => {
    if (!email) {
      setEmailMessage('이메일을 입력해주세요.');
      setIsEmailChecked(false);
      setIsEmailAvailable(false);
      return;
    }

    // 이메일 유효성 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailMessage('올바른 이메일 형식을 입력해주세요.');
      setIsEmailChecked(false);
      setIsEmailAvailable(false);
      return;
    }

    // 임시로 특정 이메일은 이미 사용 중으로 처리
    const unavailableEmails = ['admin@example.com', 'test@example.com', 'user@example.com'];
    if (unavailableEmails.includes(email.toLowerCase())) {
      setEmailMessage('이미 사용 중인 이메일입니다.');
      setIsEmailChecked(true);
      setIsEmailAvailable(false);
    } else {
      setEmailMessage('사용 가능한 이메일입니다.');
      setIsEmailChecked(true);
      setIsEmailAvailable(true);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // 유효성 검사
    if (!isUserIdChecked || !isUserIdAvailable) {
      alert('아이디 중복확인을 완료해주세요.');
      return;
    }

    if (password.length < 8) {
      setPasswordMessage('비밀번호는 8자 이상이어야 합니다.');
      return;
    }

    if (password !== passwordConfirm) {
      setPasswordMessage('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!isEmailChecked || !isEmailAvailable) {
      alert('이메일 중복확인을 완료해주세요.');
      return;
    }

    // 회원가입 성공
    alert('회원가입이 완료되었습니다!');
    window.location.href = '/login';
  };

  const handleBackToLogin = () => {
    window.location.href = '/login';
  };

  // 아이디가 변경되면 중복확인 상태 초기화
  const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
    setIsUserIdChecked(false);
    setIsUserIdAvailable(false);
    setUserIdMessage('');
  };

  // 이메일이 변경되면 중복확인 상태 초기화
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setIsEmailChecked(false);
    setIsEmailAvailable(false);
    setEmailMessage('');
  };

  // 비밀번호 확인 체크
  const handlePasswordConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(e.target.value);
    if (e.target.value && password !== e.target.value) {
      setPasswordMessage('비밀번호가 일치하지 않습니다.');
    } else {
      setPasswordMessage('');
    }
  };

  return (
    <SignUpPageWrapper>
      <SignUpCard>
        <SignUpHeader>
          <LogoWrapper>
            <LogoImage src="/VOIDDOT.svg" alt="VOID." width={42} height={42} />
            <LogoText>VOID.</LogoText>
          </LogoWrapper>
          <SignUpTitle>회원가입</SignUpTitle>
        </SignUpHeader>

        <SignUpForm onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="userId">아이디</Label>
            <InputWrapper>
              <Input
                id="userId"
                type="text"
                placeholder="아이디 (4~20자, 영문+숫자)"
                value={userId}
                onChange={handleUserIdChange}
                required
              />
              <SmallButton type="button" onClick={handleUserIdCheck}>
                중복확인
              </SmallButton>
            </InputWrapper>
            {userIdMessage && (
              isUserIdAvailable ? (
                <SuccessMessage>{userIdMessage}</SuccessMessage>
              ) : (
                <ErrorMessage>{userIdMessage}</ErrorMessage>
              )
            )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              type="password"
              placeholder="비밀번호 (8자 이상)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="passwordConfirm">비밀번호 확인</Label>
            <Input
              id="passwordConfirm"
              type="password"
              placeholder="비밀번호를 다시 입력하세요"
              value={passwordConfirm}
              onChange={handlePasswordConfirmChange}
              required
            />
            {passwordMessage && <ErrorMessage>{passwordMessage}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="email">이메일</Label>
            <InputWrapper>
              <Input
                id="email"
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={handleEmailChange}
                required
              />
              <SmallButton type="button" onClick={handleEmailCheck}>
                중복확인
              </SmallButton>
            </InputWrapper>
            {emailMessage && (
              isEmailAvailable ? (
                <SuccessMessage>{emailMessage}</SuccessMessage>
              ) : (
                <ErrorMessage>{emailMessage}</ErrorMessage>
              )
            )}
          </FormGroup>

          <SignUpButton type="submit">
            회원가입
          </SignUpButton>

          <BackToLoginButton type="button" onClick={handleBackToLogin}>
            로그인으로 돌아가기
          </BackToLoginButton>
        </SignUpForm>
      </SignUpCard>
    </SignUpPageWrapper>
  );
};

export default SignUp;
