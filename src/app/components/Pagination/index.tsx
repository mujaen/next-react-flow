import {
    iconArrowBlack,
    iconArrowDisabled,
    iconArrowBlackDouble,
    iconArrowDoubleDisabled,
  } from 'assets/icons';
  import React from 'react';
  import styled from 'styled-components';
  import ButtonPage from './ButtonPage';
  import PaginationWrapper from './Wrapper';
  
  interface PaginationButtonGroupProps {
    small: boolean;
    page: number;
    totalPage: number;
    paginateTo: (index: number) => void;
    marginTop?: string;
    marginBottom?: string;
  }
  
  const PrevButtonWrapper = styled.div`
    display: flex;
    margin-right: 10px;
  `;
  const NextButtonWrapper = styled.div`
    display: flex;
    margin-left: 10px;
  `;
  
  const Icon = styled.img<{ isRotated?: boolean }>`
    ${({ isRotated }) => isRotated && 'transform: rotate(180deg);'}
  `;
  
  export default class PaginationButtonGroup extends React.Component<
    PaginationButtonGroupProps
  > {
    constructor(props: PaginationButtonGroupProps) {
      super(props);
  
      this.handleFirstButtonClicked = this.handleFirstButtonClicked.bind(this);
      this.handleLastButtonClicked = this.handleLastButtonClicked.bind(this);
      this.handlePrevButtonClicked = this.handlePrevButtonClicked.bind(this);
      this.handleNextButtonClicked = this.handleNextButtonClicked.bind(this);
      this.makePageButtonClickHandler = this.makePageButtonClickHandler.bind(
        this,
      );
    }
  
    private handleFirstButtonClicked() {
      if (this.props.page === 1) {
        return;
      }
      this.props.paginateTo(1);
    }
  
    private handleLastButtonClicked() {
      if (this.props.page === this.props.totalPage) {
        return;
      }
      this.props.paginateTo(this.props.totalPage);
    }
  
    /**
     * 이전 버튼을 클릭했을 때 작동하는 함수
     *
     * @private
     * @returns
     * @memberof PaginationButtonGroup
     */
    private handlePrevButtonClicked() {
      if (this.props.page === 1) {
        return;
      }
      this.props.paginateTo(this.props.page - 1);
    }
  
    /**
     * 다음 버튼을 클릭했을 때 작동하는 함수
     *
     * @private
     * @returns
     * @memberof PaginationButtonGroup
     */
    private handleNextButtonClicked() {
      if (this.props.page === this.props.totalPage) {
        return;
      }
      this.props.paginateTo(this.props.page + 1);
    }
  
    /**
     * 페이지 버튼을 클릭했을 때 작동하는 함수를 만듧니다.
     *
     * @private
     * @param {number} index
     * @returns
     * @memberof PaginationButtonGroup
     */
    private makePageButtonClickHandler(index: number) {
      return () => this.props.paginateTo(index);
    }
  
    public render() {
      const { marginTop, marginBottom } = this.props;
      const VISIBLE_PAGE_COUNT = this.props.small ? 5 : 10;
      const currentPage = this.props.page;
      const { totalPage } = this.props;
  
      const start =
        Math.floor((currentPage - 1) / VISIBLE_PAGE_COUNT) * VISIBLE_PAGE_COUNT;
      const end =
        Math.ceil(currentPage / VISIBLE_PAGE_COUNT) * VISIBLE_PAGE_COUNT;
  
      // 페이지네이션 리스트
      const pages = Array(totalPage)
        .fill(null)
        .map((x, i) => i + 1)
        .map(index => (
          <ButtonPage
            key={`page-button-${index}`}
            color={index === currentPage ? '#3397ff' : 'black'}
            fontWeight={index === currentPage ? 'bold' : 'normal'}
            onClick={this.makePageButtonClickHandler(index)}
          >
            {index}
          </ButtonPage>
        ))
        .slice(start, end);
  
      if (pages.length === 0) {
        return null;
      }
  
      return (
        <PaginationWrapper marginTop={marginTop} marginBottom={marginBottom}>
          <PrevButtonWrapper>
            <ButtonPage
              disabled={currentPage === 1}
              onClick={this.handleFirstButtonClicked}
            >
              <Icon
                isRotated
                src={
                  currentPage === 1
                    ? iconArrowDoubleDisabled
                    : iconArrowBlackDouble
                }
              />
            </ButtonPage>
            <ButtonPage
              disabled={currentPage === 1}
              onClick={this.handlePrevButtonClicked}
            >
              <Icon
                isRotated
                src={currentPage === 1 ? iconArrowDisabled : iconArrowBlack}
              />
            </ButtonPage>
          </PrevButtonWrapper>
  
          {pages}
  
          <NextButtonWrapper>
            <ButtonPage
              disabled={currentPage === totalPage}
              onClick={this.handleNextButtonClicked}
            >
              <Icon
                src={
                  currentPage === totalPage ? iconArrowDisabled : iconArrowBlack
                }
              />
            </ButtonPage>
            <ButtonPage
              disabled={currentPage === totalPage}
              onClick={this.handleLastButtonClicked}
            >
              <Icon
                src={
                  currentPage === totalPage
                    ? iconArrowDoubleDisabled
                    : iconArrowBlackDouble
                }
              />
            </ButtonPage>
          </NextButtonWrapper>
        </PaginationWrapper>
      );
    }
  }
  