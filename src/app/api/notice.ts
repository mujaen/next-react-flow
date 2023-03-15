import { NoticeCategory, NoticeResponse } from 'models/Notice';
import { BASE_URL_API } from 'utils/constants/url';
import { requestGet } from 'utils/request';

const noticeAPI = {
  /**
   * 주어진 카테고리의 공지사항 목록을 가져옵니다.
   */
  getNotices(
    category: NoticeCategory,
    page: number,
    perPage: number,
  ): Promise<NoticeResponse[]> {
    return requestGet(`${BASE_URL_API}/Notices`, {
      filter: JSON.stringify({
        limit: perPage,
        skip: perPage * (page - 1),
        order: 'id DESC',
        where: {
          category: {
            inq:
              category === NoticeCategory.All
                ? ['service', 'event', 'announce']
                : [category],
          },
        },
      }),
    });
  },

  /**
   * 주어진 카테고리의 공지사항 개수를 가져옵니다.
   */
  getNoticeCount(category: NoticeCategory): Promise<{ count: number }> {
    return requestGet(`${BASE_URL_API}/Notices/count`, {
      where: JSON.stringify({
        category: {
          inq:
            category === NoticeCategory.All
              ? ['service', 'event', 'announce']
              : [category],
        },
      }),
    });
  },
};

export default noticeAPI;
