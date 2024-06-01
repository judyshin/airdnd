/* eslint-disable import/prefer-default-export */

import { NextResponse } from 'next/server'
import data from '@data/Host.json'

export function GET(request) {
  // 1 호스트 조회의 기준이 되는 hostId를 가져온다.
  const url = new URL(request.url)
  // console.log('----------------------url: ', url)

  const { searchParams } = url
  // console.log('----------------------searchParams: ', searchParams)

  try {
    const hostId = Number(searchParams.get('hostId'))
    // console.log('----------------------hostId: ', hostId)

    if (!hostId) {
      throw new Error('hostId is missing')
    }

    // 2 데이베이스 역할의 JSON 파일을 가져온다.

    const hosts = data.hostInfo
    // console.log('----------------------hosts: ', hosts)

    if (!Array.isArray(hosts)) {
      throw new Error('hosts is not an array')
    }

    // 3 데이터베이스 연산 작업을 모의로 수행한다.
    /*
    SELECT
            ...fields
    FROM
            host_info
    WHERE
            host_id = hostId;
    */

    const host = hosts.find(host => host.hostProfile.hostId === hostId)
    // console.log('----------------------host: ', host)

    if (!host) {
      throw new Error('no host found with the given hostId')
    }

    searchParams.delete('hostId')

    const fields = Array.from(searchParams.keys())
    // console.log('----------------------fields: ', fields)

    if (!fields.length) {
      throw new Error('fields are missing')
    }

    const record = {}

    for (const field of fields) {
      record[field] = host[field]
    }
    // console.log('----------------------record: ', record)

    if (!Object.keys(record).length) {
      throw new Error('no fields found')
    }

    // 4 클라이언트에게 JSON 형식으로 응답한다.
    return NextResponse.json(record, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    // 5 에러가 발생하면 클라이언트에게 에러 메시지를 응답한다.
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch accommodation data' }, { status: 500 })
  }
}
