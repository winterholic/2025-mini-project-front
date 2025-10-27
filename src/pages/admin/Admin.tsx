import { useState } from 'react';
import styled from 'styled-components';
import { getCurrentUser } from '../../utils/auth';

const AdminWrapper = styled.div`
  min-height: 100vh;
  background: #f9fafb;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans KR', sans-serif;
`;

const Header = styled.header`
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
  padding: 1rem 2rem;
`;

const HeaderContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const LogoImage = styled.img`
  border-radius: 6px;
`;

const LogoText = styled.h1`
  font-size: 24px;
  font-weight: 800;
  color: #111827;
  margin: 0;
`;

const BackButton = styled.a`
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
  display: inline-block;

  &:hover {
    background: #e5e7eb;
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
`;

const PageTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 0.5rem 0;
`;

const PageSubtitle = styled.p`
  font-size: 1rem;
  color: #6b7280;
  margin: 0 0 2rem 0;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div<{ $color: string }>`
  background: #fff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-left: 4px solid ${props => props.$color};
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.25rem;
`;

const StatChange = styled.div<{ $positive: boolean }>`
  font-size: 0.875rem;
  color: ${props => props.$positive ? '#10b981' : '#ef4444'};
  font-weight: 600;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const Panel = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
`;

const PanelTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
`;

const TabGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Tab = styled.button<{ $active: boolean }>`
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: ${props => props.$active ? '#667eea' : '#6b7280'};
  background: ${props => props.$active ? '#eef2ff' : 'transparent'};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f3f4f6;
  }
`;

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: start;
  gap: 1rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 8px;
  transition: all 0.2s;

  &:hover {
    background: #f3f4f6;
  }
`;

const ActivityIcon = styled.div<{ $color: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.$color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  flex-shrink: 0;
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityTitle = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.25rem;
`;

const ActivityDesc = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
`;

const QuickLinksGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
`;

const QuickLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 8px;
  text-decoration: none;
  color: #111827;
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.2s;

  &:hover {
    background: #eef2ff;
    color: #667eea;
  }
`;

const ChartPlaceholder = styled.div`
  height: 300px;
  background: linear-gradient(180deg, #eef2ff 0%, #f9fafb 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  font-size: 0.875rem;
`;

const TableWrapper = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  text-align: left;
  padding: 0.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #6b7280;
  border-bottom: 1px solid #e5e7eb;
`;

const Td = styled.td`
  padding: 0.75rem;
  font-size: 0.875rem;
  color: #111827;
  border-bottom: 1px solid #f3f4f6;
`;

const Badge = styled.span<{ $variant: 'success' | 'warning' | 'danger' | 'info' }>`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  ${props => {
    switch (props.$variant) {
      case 'success':
        return 'background: #d1fae5; color: #065f46;';
      case 'warning':
        return 'background: #fef3c7; color: #92400e;';
      case 'danger':
        return 'background: #fee2e2; color: #991b1b;';
      case 'info':
        return 'background: #dbeafe; color: #1e40af;';
    }
  }}
`;

const Admin = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'orders'>('users');
  const currentUser = getCurrentUser();

  return (
    <AdminWrapper>
      <Header>
        <HeaderContent>
          <Logo>
            <LogoImage src="/VOIDDOT.svg" alt="VOID." width={36} height={36} />
            <LogoText>VOID. Admin</LogoText>
          </Logo>
          <BackButton href="/">메인으로</BackButton>
        </HeaderContent>
      </Header>

      <Container>
        <PageTitle>대시보드</PageTitle>
        <PageSubtitle>
          {currentUser?.name || currentUser?.username}님, 환영합니다! 시스템 현황을 한눈에 확인하세요.
        </PageSubtitle>

        <StatsGrid>
          <StatCard $color="#667eea">
            <StatLabel>총 사용자</StatLabel>
            <StatValue>1,234</StatValue>
            <StatChange $positive={true}>+12% 이번 달</StatChange>
          </StatCard>

          <StatCard $color="#10b981">
            <StatLabel>총 주문</StatLabel>
            <StatValue>856</StatValue>
            <StatChange $positive={true}>+8% 이번 달</StatChange>
          </StatCard>

          <StatCard $color="#f59e0b">
            <StatLabel>블로그 포스트</StatLabel>
            <StatValue>342</StatValue>
            <StatChange $positive={true}>+23 신규</StatChange>
          </StatCard>

          <StatCard $color="#ef4444">
            <StatLabel>오늘 방문자</StatLabel>
            <StatValue>5,678</StatValue>
            <StatChange $positive={false}>-3% 어제 대비</StatChange>
          </StatCard>
        </StatsGrid>

        <ContentGrid>
          <Panel>
            <PanelHeader>
              <PanelTitle>최근 데이터</PanelTitle>
              <TabGroup>
                <Tab $active={activeTab === 'users'} onClick={() => setActiveTab('users')}>
                  사용자
                </Tab>
                <Tab $active={activeTab === 'orders'} onClick={() => setActiveTab('orders')}>
                  주문
                </Tab>
              </TabGroup>
            </PanelHeader>

            {activeTab === 'users' ? (
              <TableWrapper>
                <Table>
                  <thead>
                    <tr>
                      <Th>이름</Th>
                      <Th>이메일</Th>
                      <Th>가입일</Th>
                      <Th>상태</Th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <Td>김철수</Td>
                      <Td>chulsoo@example.com</Td>
                      <Td>2025-01-15</Td>
                      <Td><Badge $variant="success">활성</Badge></Td>
                    </tr>
                    <tr>
                      <Td>이영희</Td>
                      <Td>younghee@example.com</Td>
                      <Td>2025-01-14</Td>
                      <Td><Badge $variant="success">활성</Badge></Td>
                    </tr>
                    <tr>
                      <Td>박민수</Td>
                      <Td>minsu@example.com</Td>
                      <Td>2025-01-13</Td>
                      <Td><Badge $variant="warning">대기</Badge></Td>
                    </tr>
                    <tr>
                      <Td>최지은</Td>
                      <Td>jieun@example.com</Td>
                      <Td>2025-01-12</Td>
                      <Td><Badge $variant="success">활성</Badge></Td>
                    </tr>
                    <tr>
                      <Td>정태양</Td>
                      <Td>taeyang@example.com</Td>
                      <Td>2025-01-11</Td>
                      <Td><Badge $variant="danger">정지</Badge></Td>
                    </tr>
                  </tbody>
                </Table>
              </TableWrapper>
            ) : (
              <TableWrapper>
                <Table>
                  <thead>
                    <tr>
                      <Th>주문번호</Th>
                      <Th>고객</Th>
                      <Th>금액</Th>
                      <Th>상태</Th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <Td>#ORD-1234</Td>
                      <Td>김철수</Td>
                      <Td>129,000원</Td>
                      <Td><Badge $variant="success">배송완료</Badge></Td>
                    </tr>
                    <tr>
                      <Td>#ORD-1233</Td>
                      <Td>이영희</Td>
                      <Td>45,000원</Td>
                      <Td><Badge $variant="info">배송중</Badge></Td>
                    </tr>
                    <tr>
                      <Td>#ORD-1232</Td>
                      <Td>박민수</Td>
                      <Td>89,000원</Td>
                      <Td><Badge $variant="warning">준비중</Badge></Td>
                    </tr>
                    <tr>
                      <Td>#ORD-1231</Td>
                      <Td>최지은</Td>
                      <Td>156,000원</Td>
                      <Td><Badge $variant="success">배송완료</Badge></Td>
                    </tr>
                    <tr>
                      <Td>#ORD-1230</Td>
                      <Td>정태양</Td>
                      <Td>67,000원</Td>
                      <Td><Badge $variant="danger">취소</Badge></Td>
                    </tr>
                  </tbody>
                </Table>
              </TableWrapper>
            )}
          </Panel>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <Panel>
              <PanelHeader>
                <PanelTitle>최근 활동</PanelTitle>
              </PanelHeader>
              <ActivityList>
                <ActivityItem>
                  <ActivityIcon $color="#dbeafe">👤</ActivityIcon>
                  <ActivityContent>
                    <ActivityTitle>새로운 사용자 가입</ActivityTitle>
                    <ActivityDesc>김철수님이 가입했습니다 • 5분 전</ActivityDesc>
                  </ActivityContent>
                </ActivityItem>
                <ActivityItem>
                  <ActivityIcon $color="#d1fae5">🛒</ActivityIcon>
                  <ActivityContent>
                    <ActivityTitle>새로운 주문</ActivityTitle>
                    <ActivityDesc>주문 #ORD-1234 접수 • 12분 전</ActivityDesc>
                  </ActivityContent>
                </ActivityItem>
                <ActivityItem>
                  <ActivityIcon $color="#fef3c7">📝</ActivityIcon>
                  <ActivityContent>
                    <ActivityTitle>새로운 블로그 포스트</ActivityTitle>
                    <ActivityDesc>"React 최신 트렌드" 발행 • 1시간 전</ActivityDesc>
                  </ActivityContent>
                </ActivityItem>
                <ActivityItem>
                  <ActivityIcon $color="#fee2e2">⚠️</ActivityIcon>
                  <ActivityContent>
                    <ActivityTitle>시스템 알림</ActivityTitle>
                    <ActivityDesc>서버 점검 예정 • 2시간 전</ActivityDesc>
                  </ActivityContent>
                </ActivityItem>
              </ActivityList>
            </Panel>

            <Panel>
              <PanelHeader>
                <PanelTitle>빠른 링크</PanelTitle>
              </PanelHeader>
              <QuickLinksGrid>
                <QuickLink href="/admin/users">
                  사용자 관리 →
                </QuickLink>
                <QuickLink href="/admin/products">
                  상품 관리 →
                </QuickLink>
                <QuickLink href="/admin/orders">
                  주문 관리 →
                </QuickLink>
                <QuickLink href="/admin/posts">
                  블로그 관리 →
                </QuickLink>
                <QuickLink href="/admin/settings">
                  시스템 설정 →
                </QuickLink>
              </QuickLinksGrid>
            </Panel>
          </div>
        </ContentGrid>

        <Panel>
          <PanelHeader>
            <PanelTitle>방문자 통계</PanelTitle>
          </PanelHeader>
          <ChartPlaceholder>
            📊 차트가 여기에 표시됩니다 (Chart.js 또는 Recharts 라이브러리 사용 권장)
          </ChartPlaceholder>
        </Panel>
      </Container>
    </AdminWrapper>
  );
};

export default Admin;
