import Badge from 'components/Badge';
import { NoticeData } from 'models/Notice';
import React from 'react';
import styled from 'styled-components';
import filters from 'utils/filters';

interface NoticeEntityProps {
  notice: NoticeData;
  active?: boolean;
  compact?: boolean;
  onClick: React.MouseEventHandler;
}

const TitleWrapper = styled.div<{
  active: boolean;
  padding: string;
  smallFont: boolean;
}>`
  display: flex;
  justify-content: space-between;
  min-height: 60px;
  line-height: ${({ smallFont }) => (smallFont ? '18px' : '24px')};
  padding: ${({ padding }) => padding} 0;
  font-size: ${({ smallFont }) => (smallFont ? '12px' : '14px')};
  cursor: pointer;

  ${({ active }) =>
    active
      ? `
    font-weight: bold;
  `
      : `
    border-bottom: solid 1px #e6e6e6;
  `}
`;

const ExtendedBadge = styled(Badge)`
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: auto;
`;

const Title = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
`;

const New = styled.span`
  margin-left: 5px;
  color: #ff6666;
  font-weight: bold;
`;

const Date = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: auto;
  margin-left: 10px;
  color: #9b9b9b;
  font-size: 12px;
  font-weight: normal;
`;

const Content = styled.div<{ fontSize?: string; lineHeight?: string }>`
  width: 100%;
  min-height: 84px;
  padding: 20px;
  background-color: #eff7ff;
  color: #4a4a4a;
  ${({ fontSize }) => (fontSize ? `font-size: ${fontSize};` : '')}
  ${({ lineHeight }) => (lineHeight ? `line-height: ${lineHeight};` : '')}

  * {
    width: 100%;
    font-family: inherit;
  }

  img {
    max-width: 600px;
  }
`;

const NoticeEntity: React.SFC<
  NoticeEntityProps & React.DOMAttributes<HTMLElement>
> = ({ notice, active, compact, onClick }) => (
  <li>
    <TitleWrapper
      active={!!active}
      padding={compact ? '20px' : '18px'}
      smallFont={!!compact}
      onClick={onClick}
    >
      <ExtendedBadge
        bgColor={filters.noticeCategoryToColor(notice.category)}
        marginRight={compact ? '10px' : '21px'}
      >
        {filters.noticeCategoryToKorean(notice.category)}
      </ExtendedBadge>
      <Title>
        {notice.title}
        {notice.isNew && <New>New</New>}
      </Title>
      {!compact && <Date>{filters.formatDate(notice.created)}</Date>}
    </TitleWrapper>
    {active && (
      <Content
        fontSize={compact ? '12px' : '14px'}
        lineHeight={compact ? '18px' : '24px'}
        dangerouslySetInnerHTML={{ __html: notice.content }}
      />
    )}
  </li>
);

export default NoticeEntity;
