import Button from "./Button";

import styled from "@emotion/styled";

interface PaginationGroupProps {
  page: number;
  totalPage: number;
  paginateTo: (index: number) => void;
}

const Wrapper = styled.div`
  display: flex;
`;

const PrevButtonWrapper = styled.div`
  display: flex;

  margin-right: 10px;
`;

const NextButtonWrapper = styled.div`
  display: flex;

  margin-left: 10px;
`;

function PaginationGroup({
  page,
  totalPage,
  paginateTo,
}: PaginationGroupProps) {
  /**
   * 처음 버튼 클릭 시 동작되는 함수
   *
   * @returns
   * @memberof PaginationButtonGroup
   */
  const handleFirstButtonClick = () => {
    if (page === 1) {
      return;
    }
    paginateTo(1);
  };

  /**
   * 이전 버튼 클릭 시 동작되는 함수
   *
   * @returns
   * @memberof PaginationButtonGroup
   */
  const handlePrevButtonClick = () => {
    if (page === 1) {
      return;
    }
    paginateTo(page - 1);
  };

  /**
   * 다음 버튼 클릭 시 동작되는 함수
   *
   * @returns
   * @memberof PaginationButtonGroup
   */
  const handleNextButtonClick = () => {
    if (page === totalPage) {
      return;
    }
    paginateTo(page + 1);
  };

  /**
   * 마지막 버튼 클릭 시 동작되는 함수
   *
   * @returns
   * @memberof PaginationButtonGroup
   */
  const handleLastButtonClick = () => {
    if (page === totalPage) {
      return;
    }
    paginateTo(totalPage);
  };

  /**
   * 페이지 버튼 클릭 시 동작되는 함수
   *
   * @returns
   * @params {number} index
   * @memberof PaginationButtonGroup
   */
  const handlePageButtonClick = (index: number) => () => paginateTo(index);

  const pages = Array(totalPage)
    .fill(null)
    .map((x, i) => i + 1)
    .map((index) => (
      <Button
        key={`paginate-${index}`}
        color={index === page ? "red" : "black"}
        isSelected={index === page}
        onClick={handlePageButtonClick(index)}
      >
        {index}
      </Button>
    ));

  return (
    <Wrapper>
      <PrevButtonWrapper>
        <Button onClick={handleFirstButtonClick}>First</Button>
        <Button onClick={handlePrevButtonClick}>Prev</Button>
      </PrevButtonWrapper>
      {pages}
      <NextButtonWrapper>
        <Button onClick={handleNextButtonClick}>Next</Button>
        <Button onClick={handleLastButtonClick}>Last</Button>
      </NextButtonWrapper>
    </Wrapper>
  );
}

export default PaginationGroup;
