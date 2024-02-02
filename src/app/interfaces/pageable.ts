export interface Pageable<T> {
  content: T[],
  empty: boolean,
  first: boolean,
  last: boolean,
  number: number,
  numberOfElements: number,
  pageable: {
    pageNumber: number,
    pageSize: number,
    sort: {
        empty: boolean,
        unsorted: boolean,
        sorted: boolean
    },
    offset: 0,
    paged: true,
    unpaged: false
  },
  totalPages: number,
  totalElements: number
}
