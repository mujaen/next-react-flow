import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components';
import NoticeEntity from 'components/NoticeEntity';
import LeftPageTitle from 'components/PageTitle/Left';
import PageWrapper from 'components/PageWrapper';
import PaginationButtonGroup from 'components/PaginationButtonGroup';
import TabLabels from 'components/TabLabels';
import { makeSelectIsMobile } from 'containers/App/selectors';
import { NoticeCategory } from 'models/Notice';
import filters from 'utils/filters';
import { injectReducer, injectSaga } from 'redux-injectors';
import { useWebviewHeaderAction } from 'utils/webview';
import { loadNoticeList } from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectNotices, makeSelectNoticeTotalPage } from './selectors';

const NoticeListWrapper = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const NoticePage: React.FC = () => {
  const isMobile = useSelector(makeSelectIsMobile());
  const notices = useSelector(makeSelectNotices());
  const totalPages = useSelector(makeSelectNoticeTotalPage());

  const dispatch = useDispatch();

  const callUpdateHeaderHandler = useWebviewHeaderAction('공지사항');

  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState(NoticeCategory.All);
  const [activeNoticeId, setActiveNoticeId] = useState<number | undefined>();

  const allNoticeCategoryValues = useMemo(
    () => Object.keys(NoticeCategory).map(category => NoticeCategory[category]),
    [],
  );

  /**
   * 주어진 ID의 공지사항의 클릭 이벤트 핸들러를 만듧니다.
   *
   * @param {number} noticeId
   * @returns {React.MouseEventHandler}
   * @memberof NoticePage
   */
  const makeNoticeEntityClickHandler = useCallback(
    (noticeId: number): React.MouseEventHandler => () => {
      setActiveNoticeId(noticeId);
    },
    [setActiveNoticeId],
  );

  /**
   * 카테고리가 바뀌었을 때 처리 함수
   *
   * @param {NoticeCategory} category
   * @memberof NoticePage
   */
  const handleOnChangeNoticeCategory = useCallback(
    (category: NoticeCategory) => {
      setCategory(category);
      setCurrentPage(1);
    },
    [setCategory, setCurrentPage],
  );

  /**
   * 페이지가 바뀌었을 때 처리 함수
   *
   * @param {number} index
   * @memberof NoticePage
   */
  const handleOnChangePage = useCallback(
    (index: number) => {
      setCurrentPage(index);
    },
    [setCurrentPage],
  );

  useEffect((): void => {
    dispatch(loadNoticeList(NoticeCategory.All, 1));

    callUpdateHeaderHandler();
  }, [dispatch, callUpdateHeaderHandler]);

  useEffect((): void => {
    dispatch(loadNoticeList(category, currentPage));
  }, [dispatch, category, currentPage]);

  return (
    <PageWrapper>
      <Helmet>
        <title>공지사항</title>
      </Helmet>
      <LeftPageTitle margin="30px 0 20px" fontSize="24px" lineHeight="24px">
        공지사항
      </LeftPageTitle>
      <TabLabels
        tabs={allNoticeCategoryValues}
        activeTab={category}
        labelFilter={filters.noticeCategoryToKorean}
        onChange={handleOnChangeNoticeCategory}
      />
      <NoticeListWrapper>
        {notices.map(notice => (
          <NoticeEntity
            key={`notice-${notice.id}`}
            notice={notice}
            active={notice.id === activeNoticeId}
            compact={isMobile}
            onClick={makeNoticeEntityClickHandler(notice.id)}
          />
        ))}
      </NoticeListWrapper>
      <PaginationButtonGroup
        page={currentPage}
        totalPage={totalPages}
        paginateTo={handleOnChangePage}
        small={isMobile}
      />
    </PageWrapper>
  );
};

const withReducer = injectReducer({ reducer, key: 'noticePage' });
const withSaga = injectSaga({ saga, key: 'noticePage' });

export default compose(withReducer, withSaga)(NoticePage);
