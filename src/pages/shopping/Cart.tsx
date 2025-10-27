import { useState } from 'react';
import styled from 'styled-components';
import { media } from '../../styles/media';

const CartPageWrapper = styled.div`
  min-height: 100vh;
  background-color: #f8f8f8;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans KR', sans-serif;
`;

const Header = styled.header`
  background-color: #fff;
  border-bottom: 1px solid #e5e5e5;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
`;

const HeaderContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${media.tablet`
    padding: 1.25rem 2rem;
  `}

  ${media.desktop`
    padding: 1.5rem 2.5rem;
  `}
`;

const StyledLogoLink = styled.a`
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StyledLogoImage = styled.img`
  border-radius: 6px;
`;

const StyledLogoText = styled.span`
  color: #111827;
  font-weight: 800;
  font-size: 22px;
`;

const NavMenu = styled.nav`
  display: none;
  gap: 2rem;

  ${media.tablet`
    display: flex;
  `}
`;

const NavItem = styled.a<{ $active?: boolean }>`
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: ${props => props.$active ? '600' : '400'};
  color: ${props => props.$active ? '#000' : '#666'};
  cursor: pointer;
  padding: 0.5rem 0;
  transition: color 0.2s;
  border-bottom: ${props => props.$active ? '2px solid #000' : '2px solid transparent'};

  &:hover {
    color: #000;
  }
`;

const MainContent = styled.main`
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem 1rem;

  ${media.tablet`
    padding: 2.5rem 2rem;
  `}

  ${media.desktop`
    padding: 3rem 2.5rem;
  `}
`;

const PageTitle = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  color: #111;
  margin: 0 0 2rem;

  ${media.tablet`
    font-size: 2rem;
  `}
`;

const CartGrid = styled.div`
  display: grid;
  gap: 2rem;

  ${media.desktop`
    grid-template-columns: 2fr 1fr;
  `}
`;

const CartItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CartItem = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  gap: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
`;

const ItemImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  background: #f0f0f0;

  ${media.tablet`
    width: 120px;
    height: 120px;
  `}
`;

const ItemInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ItemBrand = styled.div`
  font-size: 0.875rem;
  color: #666;
  font-weight: 500;
`;

const ItemTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #111;
  margin: 0.25rem 0 0.5rem;

  ${media.tablet`
    font-size: 1.1rem;
  `}
`;

const ItemPrice = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: #111;
`;

const ItemControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  padding: 0.5rem;
`;

const QuantityButton = styled.button`
  width: 28px;
  height: 28px;
  border: none;
  background: #f5f5f5;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: #666;
  transition: all 0.2s;

  &:hover {
    background: #e5e5e5;
    color: #000;
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const QuantityValue = styled.span`
  width: 32px;
  text-align: center;
  font-weight: 600;
  font-size: 0.95rem;
`;

const RemoveButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid #e5e5e5;
  background: #fff;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.875rem;
  color: #666;
  transition: all 0.2s;

  &:hover {
    border-color: #ff4444;
    color: #ff4444;
  }
`;

const OrderSummary = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  height: fit-content;
  position: sticky;
  top: 100px;
`;

const SummaryTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #111;
  margin: 0 0 1.5rem;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 0.95rem;
`;

const SummaryLabel = styled.span`
  color: #666;
`;

const SummaryValue = styled.span`
  font-weight: 600;
  color: #111;
`;

const Divider = styled.div`
  height: 1px;
  background: #e5e5e5;
  margin: 1.5rem 0;
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const TotalLabel = styled.span`
  font-size: 1.1rem;
  font-weight: 700;
  color: #111;
`;

const TotalValue = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: #667eea;
`;

const CheckoutButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 4rem 1rem;
  background: #fff;
  border-radius: 12px;
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

const EmptyTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #111;
  margin: 0 0 0.5rem;
`;

const EmptyDesc = styled.p`
  font-size: 1rem;
  color: #666;
  margin: 0 0 2rem;
`;

const ShopButton = styled.a`
  display: inline-block;
  padding: 0.875rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
  }
`;

interface CartItemType {
  id: number;
  imageUrl: string;
  title: string;
  brand: string;
  price: number;
  quantity: number;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([
    {
      id: 1,
      imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5',
      title: '오버사이즈 코튼 후디',
      brand: 'VOID.',
      price: 89000,
      quantity: 1,
    },
    {
      id: 2,
      imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d',
      title: '클래식 데님 자켓',
      brand: 'DENIM CO.',
      price: 129000,
      quantity: 2,
    },
    {
      id: 3,
      imageUrl: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb',
      title: '미니멀 스니커즈',
      brand: 'MINIMAL',
      price: 149000,
      quantity: 1,
    },
  ]);

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? (subtotal >= 50000 ? 0 : 3000) : 0;
  const total = subtotal + shipping;

  return (
    <CartPageWrapper>
      <Header>
        <HeaderContent>
          <StyledLogoLink href="/">
            <StyledLogoImage src="/VOIDDOT.svg" alt="VOID." width={36} height={36} />
            <StyledLogoText>VOID.</StyledLogoText>
          </StyledLogoLink>
          <NavMenu>
            <NavItem href="/shopping">홈</NavItem>
            <NavItem href="/shopping/cart" $active>장바구니</NavItem>
            <NavItem href="/shopping/wishlist">좋아요</NavItem>
            <NavItem>마이페이지</NavItem>
          </NavMenu>
        </HeaderContent>
      </Header>

      <MainContent>
        <PageTitle>장바구니</PageTitle>

        {cartItems.length === 0 ? (
          <EmptyCart>
            <EmptyIcon>🛒</EmptyIcon>
            <EmptyTitle>장바구니가 비어있습니다</EmptyTitle>
            <EmptyDesc>쇼핑을 시작해보세요!</EmptyDesc>
            <ShopButton href="/shopping">쇼핑하러 가기</ShopButton>
          </EmptyCart>
        ) : (
          <CartGrid>
            <CartItems>
              {cartItems.map(item => (
                <CartItem key={item.id}>
                  <ItemImage src={item.imageUrl} alt={item.title} />
                  <ItemInfo>
                    <div>
                      <ItemBrand>{item.brand}</ItemBrand>
                      <ItemTitle>{item.title}</ItemTitle>
                      <ItemPrice>{item.price.toLocaleString()}원</ItemPrice>
                    </div>
                    <ItemControls>
                      <QuantityControl>
                        <QuantityButton
                          onClick={() => updateQuantity(item.id, -1)}
                          disabled={item.quantity <= 1}
                        >
                          −
                        </QuantityButton>
                        <QuantityValue>{item.quantity}</QuantityValue>
                        <QuantityButton onClick={() => updateQuantity(item.id, 1)}>
                          +
                        </QuantityButton>
                      </QuantityControl>
                      <RemoveButton onClick={() => removeItem(item.id)}>
                        삭제
                      </RemoveButton>
                    </ItemControls>
                  </ItemInfo>
                </CartItem>
              ))}
            </CartItems>

            <OrderSummary>
              <SummaryTitle>주문 요약</SummaryTitle>
              <SummaryRow>
                <SummaryLabel>상품 금액</SummaryLabel>
                <SummaryValue>{subtotal.toLocaleString()}원</SummaryValue>
              </SummaryRow>
              <SummaryRow>
                <SummaryLabel>배송비</SummaryLabel>
                <SummaryValue>
                  {shipping === 0 ? '무료' : `${shipping.toLocaleString()}원`}
                </SummaryValue>
              </SummaryRow>
              {subtotal < 50000 && subtotal > 0 && (
                <SummaryRow>
                  <SummaryLabel style={{ fontSize: '0.75rem', color: '#667eea' }}>
                    {(50000 - subtotal).toLocaleString()}원 더 구매 시 무료배송
                  </SummaryLabel>
                </SummaryRow>
              )}
              <Divider />
              <TotalRow>
                <TotalLabel>총 결제금액</TotalLabel>
                <TotalValue>{total.toLocaleString()}원</TotalValue>
              </TotalRow>
              <CheckoutButton disabled={cartItems.length === 0}>
                주문하기
              </CheckoutButton>
            </OrderSummary>
          </CartGrid>
        )}
      </MainContent>
    </CartPageWrapper>
  );
};

export default Cart;
