import { useState } from 'react';
import Modal from './Modal';
import CheckBox from './CheckBox';
import styled from 'styled-components';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAgree: () => void;
}

const TermsContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const TermsSection = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
  background-color: #f9fafb;
`;

const TermsTitle = styled.h3`
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 0.5rem 0;
`;

const TermsText = styled.div`
  max-height: 150px;
  overflow-y: auto;
  font-size: 0.75rem;
  color: #6b7280;
  line-height: 1.5;
  padding: 0.5rem;
  background-color: #fff;
  border-radius: 4px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const CheckBoxWrapper = styled.div`
  margin-bottom: 0.5rem;
`;

const Divider = styled.div`
  height: 1px;
  background-color: #e5e7eb;
  margin: 1rem 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1.5rem;
`;

const Button = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  flex: 1;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.2s;

  ${props => props.$variant === 'primary' ? `
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #fff;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
    }
  ` : `
    background: #f3f4f6;
    color: #374151;

    &:hover {
      background: #e5e7eb;
    }
  `}
`;

const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose, onAgree }) => {
  const [agreeAll, setAgreeAll] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  const handleAgreeAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setAgreeAll(checked);
    setAgreeTerms(checked);
    setAgreePrivacy(checked);
  };

  const handleIndividualChange = (
    setter: React.Dispatch<React.SetStateAction<boolean>>,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setter(e.target.checked);
  };

  // 개별 체크박스가 모두 체크되면 전체 동의도 체크
  const updateAgreeAll = () => {
    if (agreeTerms && agreePrivacy) {
      setAgreeAll(true);
    } else {
      setAgreeAll(false);
    }
  };

  const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleIndividualChange(setAgreeTerms, e);
    setTimeout(updateAgreeAll, 0);
  };

  const handlePrivacyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleIndividualChange(setAgreePrivacy, e);
    setTimeout(updateAgreeAll, 0);
  };

  const handleConfirm = () => {
    if (agreeTerms && agreePrivacy) {
      onAgree();
      // 모달 닫을 때 상태 초기화
      setAgreeAll(false);
      setAgreeTerms(false);
      setAgreePrivacy(false);
    }
  };

  const handleClose = () => {
    onClose();
    // 모달 닫을 때 상태 초기화
    setAgreeAll(false);
    setAgreeTerms(false);
    setAgreePrivacy(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="회원가입 약관 동의"
      size="md"
      closeOnOverlayClick={false}
    >
      <TermsContent>
        <CheckBoxWrapper>
          <CheckBox
            label="전체 동의"
            checked={agreeAll}
            onChange={handleAgreeAll}
          />
        </CheckBoxWrapper>

        <Divider />

        <TermsSection>
          <TermsTitle>서비스 이용약관 (필수)</TermsTitle>
          <TermsText>
            <p><strong>제1조 (목적)</strong></p>
            <p>본 약관은 VOID.(이하 "회사")가 제공하는 서비스의 이용과 관련하여 회사와 회원 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.</p>

            <p><strong>제2조 (정의)</strong></p>
            <p>1. "서비스"란 회사가 제공하는 모든 온라인 서비스를 의미합니다.</p>
            <p>2. "회원"이란 본 약관에 동의하고 회사와 서비스 이용계약을 체결한 자를 말합니다.</p>
            <p>3. "아이디(ID)"란 회원의 식별과 서비스 이용을 위하여 회원이 정하고 회사가 승인하는 문자와 숫자의 조합을 의미합니다.</p>

            <p><strong>제3조 (약관의 효력 및 변경)</strong></p>
            <p>1. 본 약관은 회원이 약관에 동의하고 회사가 정한 절차에 따라 회원가입을 완료함으로써 효력이 발생합니다.</p>
            <p>2. 회사는 필요한 경우 관련 법령을 위배하지 않는 범위 내에서 본 약관을 변경할 수 있습니다.</p>

            <p><strong>제4조 (서비스의 제공 및 변경)</strong></p>
            <p>1. 회사는 회원에게 아래와 같은 서비스를 제공합니다.</p>
            <p>2. 회사는 서비스의 내용을 변경할 수 있으며, 변경된 서비스 내용은 공지사항을 통해 안내합니다.</p>
          </TermsText>
          <CheckBoxWrapper style={{ marginTop: '0.75rem' }}>
            <CheckBox
              label="서비스 이용약관에 동의합니다 (필수)"
              checked={agreeTerms}
              onChange={handleTermsChange}
            />
          </CheckBoxWrapper>
        </TermsSection>

        <TermsSection>
          <TermsTitle>개인정보 처리방침 (필수)</TermsTitle>
          <TermsText>
            <p><strong>1. 개인정보의 수집 및 이용 목적</strong></p>
            <p>회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.</p>
            <p>- 회원가입 및 관리: 회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증</p>
            <p>- 서비스 제공: 맞춤 서비스 제공, 본인인증</p>

            <p><strong>2. 수집하는 개인정보의 항목</strong></p>
            <p>회사는 회원가입, 원활한 고객상담 등을 위해 아래와 같은 개인정보를 수집하고 있습니다.</p>
            <p>- 필수항목: 아이디, 비밀번호, 이메일</p>

            <p><strong>3. 개인정보의 보유 및 이용기간</strong></p>
            <p>회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.</p>
            <p>- 회원 탈퇴 시까지 (단, 관계 법령 위반에 따른 수사·조사 등이 진행중인 경우에는 해당 수사·조사 종료 시까지)</p>

            <p><strong>4. 개인정보의 제3자 제공</strong></p>
            <p>회사는 정보주체의 개인정보를 제1조(개인정보의 처리 목적)에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 개인정보 보호법 제17조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.</p>
          </TermsText>
          <CheckBoxWrapper style={{ marginTop: '0.75rem' }}>
            <CheckBox
              label="개인정보 처리방침에 동의합니다 (필수)"
              checked={agreePrivacy}
              onChange={handlePrivacyChange}
            />
          </CheckBoxWrapper>
        </TermsSection>

        <ButtonGroup>
          <Button $variant="secondary" onClick={handleClose}>
            취소
          </Button>
          <Button
            $variant="primary"
            onClick={handleConfirm}
            disabled={!agreeTerms || !agreePrivacy}
          >
            확인
          </Button>
        </ButtonGroup>
      </TermsContent>
    </Modal>
  );
};

export default TermsModal;
