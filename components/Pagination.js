import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import PaginationStyles from './styles/PaginationStyles'




function Pagination({ page,  count, pages }) {

  return (
    <PaginationStyles>
      <Head>
        <title>
          Orders — Page {page} of {pages}
        </title>
      </Head>
      <Link
        href={{
          pathname: '/manageaccount',
          query: { page: page - 1 },
        }}
      >
        <a className="prev" aria-disabled={page <= 1}>
          ← Prev
        </a>
      </Link>
      <p>
        Page {page} of <span className="totalPages">{pages}</span>
      </p>
      <p>{count} Total</p>
      <Link
        href={{
          pathname: '/manageaccount',
          query: { page: page + 1 },
        }}
      >
        <a className="next" aria-disabled={page >= pages}>
          Next →
        </a>
      </Link>
    </PaginationStyles>
  )
}

export default Pagination

