import moment from 'moment';
import { upperFirst as _upperFirst } from 'lodash';

/**
 * 공지사항 종류
 *
 * @export
 * @enum {number}
 */
export enum NoticeCategory {
  All = 'all',
  Service = 'service',
  Event = 'event',
  Announce = 'announce',
}

/**
 * 공지사항 서버 응답 형식
 *
 * @export
 * @interface NoticeResponse
 */
export interface NoticeResponse {
  id: number;
  category: 'service' | 'event' | 'announce';
  title: string;
  content: string;
  created: string; // ISO8601 UTC
  sendPush: boolean;
}

/**
 * 클라이언트에서 사용하는 공지사항 형식
 *
 * @export
 * @interface NoticeData
 */
export interface NoticeData {
  id: number;
  category: NoticeCategory;
  title: string;
  content: string;
  created: string; // ISO8601 UTC
  isNew: boolean;
}

/**
 * 공지사항 클래스
 *
 * @export
 * @class Notice
 */
export class Notice {
  readonly rawData: NoticeResponse;

  constructor(data: NoticeResponse) {
    this.rawData = data;
  }

  /**
   * 인스턴스에서 객체를 가져옵니다.
   *
   * @returns {NoticeData}
   * @memberof Notice
   */
  asData(): NoticeData {
    return {
      id: this.rawData.id,
      category: NoticeCategory[_upperFirst(this.rawData.category)],
      title: this.rawData.title,
      content: this.rawData.content,
      created: this.rawData.created,
      isNew: moment().diff(this.rawData.created, 'weeks') === 0,
    };
  }
}
