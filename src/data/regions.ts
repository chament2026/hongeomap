// Source: cosmosfarm/korea-administrative-district version 20241209
// https://github.com/cosmosfarm/korea-administrative-district

export type DistrictOption = {
  name: string;
  fullName: string;
  query: string;
  fallbackLat: number;
  fallbackLng: number;
  zoom: number;
};

export type ProvinceOption = {
  name: string;
  shortName: string;
  lat: number;
  lng: number;
  zoom: number;
  districts: DistrictOption[];
};

export const koreaRegions = [
  {
    "name": "서울특별시",
    "shortName": "서울",
    "lat": 37.5665,
    "lng": 126.978,
    "zoom": 11,
    "districts": [
      {
        "name": "종로구",
        "fullName": "서울특별시 종로구",
        "query": "서울특별시 종로구",
        "fallbackLat": 37.5665,
        "fallbackLng": 126.978,
        "zoom": 12
      },
      {
        "name": "중구",
        "fullName": "서울특별시 중구",
        "query": "서울특별시 중구",
        "fallbackLat": 37.5665,
        "fallbackLng": 126.978,
        "zoom": 12
      },
      {
        "name": "용산구",
        "fullName": "서울특별시 용산구",
        "query": "서울특별시 용산구",
        "fallbackLat": 37.5665,
        "fallbackLng": 126.978,
        "zoom": 12
      },
      {
        "name": "성동구",
        "fullName": "서울특별시 성동구",
        "query": "서울특별시 성동구",
        "fallbackLat": 37.5665,
        "fallbackLng": 126.978,
        "zoom": 12
      },
      {
        "name": "광진구",
        "fullName": "서울특별시 광진구",
        "query": "서울특별시 광진구",
        "fallbackLat": 37.5665,
        "fallbackLng": 126.978,
        "zoom": 12
      },
      {
        "name": "동대문구",
        "fullName": "서울특별시 동대문구",
        "query": "서울특별시 동대문구",
        "fallbackLat": 37.5665,
        "fallbackLng": 126.978,
        "zoom": 12
      },
      {
        "name": "중랑구",
        "fullName": "서울특별시 중랑구",
        "query": "서울특별시 중랑구",
        "fallbackLat": 37.5665,
        "fallbackLng": 126.978,
        "zoom": 12
      },
      {
        "name": "성북구",
        "fullName": "서울특별시 성북구",
        "query": "서울특별시 성북구",
        "fallbackLat": 37.5665,
        "fallbackLng": 126.978,
        "zoom": 12
      },
      {
        "name": "강북구",
        "fullName": "서울특별시 강북구",
        "query": "서울특별시 강북구",
        "fallbackLat": 37.5665,
        "fallbackLng": 126.978,
        "zoom": 12
      },
      {
        "name": "도봉구",
        "fullName": "서울특별시 도봉구",
        "query": "서울특별시 도봉구",
        "fallbackLat": 37.5665,
        "fallbackLng": 126.978,
        "zoom": 12
      },
      {
        "name": "노원구",
        "fullName": "서울특별시 노원구",
        "query": "서울특별시 노원구",
        "fallbackLat": 37.5665,
        "fallbackLng": 126.978,
        "zoom": 12
      },
      {
        "name": "은평구",
        "fullName": "서울특별시 은평구",
        "query": "서울특별시 은평구",
        "fallbackLat": 37.5665,
        "fallbackLng": 126.978,
        "zoom": 12
      },
      {
        "name": "서대문구",
        "fullName": "서울특별시 서대문구",
        "query": "서울특별시 서대문구",
        "fallbackLat": 37.5665,
        "fallbackLng": 126.978,
        "zoom": 12
      },
      {
        "name": "마포구",
        "fullName": "서울특별시 마포구",
        "query": "서울특별시 마포구",
        "fallbackLat": 37.5665,
        "fallbackLng": 126.978,
        "zoom": 12
      },
      {
        "name": "양천구",
        "fullName": "서울특별시 양천구",
        "query": "서울특별시 양천구",
        "fallbackLat": 37.5665,
        "fallbackLng": 126.978,
        "zoom": 12
      },
      {
        "name": "강서구",
        "fullName": "서울특별시 강서구",
        "query": "서울특별시 강서구",
        "fallbackLat": 37.5665,
        "fallbackLng": 126.978,
        "zoom": 12
      },
      {
        "name": "구로구",
        "fullName": "서울특별시 구로구",
        "query": "서울특별시 구로구",
        "fallbackLat": 37.5665,
        "fallbackLng": 126.978,
        "zoom": 12
      },
      {
        "name": "금천구",
        "fullName": "서울특별시 금천구",
        "query": "서울특별시 금천구",
        "fallbackLat": 37.5665,
        "fallbackLng": 126.978,
        "zoom": 12
      },
      {
        "name": "영등포구",
        "fullName": "서울특별시 영등포구",
        "query": "서울특별시 영등포구",
        "fallbackLat": 37.5665,
        "fallbackLng": 126.978,
        "zoom": 12
      },
      {
        "name": "동작구",
        "fullName": "서울특별시 동작구",
        "query": "서울특별시 동작구",
        "fallbackLat": 37.5665,
        "fallbackLng": 126.978,
        "zoom": 12
      },
      {
        "name": "관악구",
        "fullName": "서울특별시 관악구",
        "query": "서울특별시 관악구",
        "fallbackLat": 37.5665,
        "fallbackLng": 126.978,
        "zoom": 12
      },
      {
        "name": "서초구",
        "fullName": "서울특별시 서초구",
        "query": "서울특별시 서초구",
        "fallbackLat": 37.5665,
        "fallbackLng": 126.978,
        "zoom": 12
      },
      {
        "name": "강남구",
        "fullName": "서울특별시 강남구",
        "query": "서울특별시 강남구",
        "fallbackLat": 37.5665,
        "fallbackLng": 126.978,
        "zoom": 12
      },
      {
        "name": "송파구",
        "fullName": "서울특별시 송파구",
        "query": "서울특별시 송파구",
        "fallbackLat": 37.5665,
        "fallbackLng": 126.978,
        "zoom": 12
      },
      {
        "name": "강동구",
        "fullName": "서울특별시 강동구",
        "query": "서울특별시 강동구",
        "fallbackLat": 37.5665,
        "fallbackLng": 126.978,
        "zoom": 12
      }
    ]
  },
  {
    "name": "부산광역시",
    "shortName": "부산",
    "lat": 35.1796,
    "lng": 129.0756,
    "zoom": 11,
    "districts": [
      {
        "name": "중구",
        "fullName": "부산광역시 중구",
        "query": "부산광역시 중구",
        "fallbackLat": 35.1796,
        "fallbackLng": 129.0756,
        "zoom": 12
      },
      {
        "name": "서구",
        "fullName": "부산광역시 서구",
        "query": "부산광역시 서구",
        "fallbackLat": 35.1796,
        "fallbackLng": 129.0756,
        "zoom": 12
      },
      {
        "name": "동구",
        "fullName": "부산광역시 동구",
        "query": "부산광역시 동구",
        "fallbackLat": 35.1796,
        "fallbackLng": 129.0756,
        "zoom": 12
      },
      {
        "name": "영도구",
        "fullName": "부산광역시 영도구",
        "query": "부산광역시 영도구",
        "fallbackLat": 35.1796,
        "fallbackLng": 129.0756,
        "zoom": 12
      },
      {
        "name": "부산진구",
        "fullName": "부산광역시 부산진구",
        "query": "부산광역시 부산진구",
        "fallbackLat": 35.1796,
        "fallbackLng": 129.0756,
        "zoom": 12
      },
      {
        "name": "동래구",
        "fullName": "부산광역시 동래구",
        "query": "부산광역시 동래구",
        "fallbackLat": 35.1796,
        "fallbackLng": 129.0756,
        "zoom": 12
      },
      {
        "name": "남구",
        "fullName": "부산광역시 남구",
        "query": "부산광역시 남구",
        "fallbackLat": 35.1796,
        "fallbackLng": 129.0756,
        "zoom": 12
      },
      {
        "name": "북구",
        "fullName": "부산광역시 북구",
        "query": "부산광역시 북구",
        "fallbackLat": 35.1796,
        "fallbackLng": 129.0756,
        "zoom": 12
      },
      {
        "name": "강서구",
        "fullName": "부산광역시 강서구",
        "query": "부산광역시 강서구",
        "fallbackLat": 35.1796,
        "fallbackLng": 129.0756,
        "zoom": 12
      },
      {
        "name": "해운대구",
        "fullName": "부산광역시 해운대구",
        "query": "부산광역시 해운대구",
        "fallbackLat": 35.1796,
        "fallbackLng": 129.0756,
        "zoom": 12
      },
      {
        "name": "사하구",
        "fullName": "부산광역시 사하구",
        "query": "부산광역시 사하구",
        "fallbackLat": 35.1796,
        "fallbackLng": 129.0756,
        "zoom": 12
      },
      {
        "name": "금정구",
        "fullName": "부산광역시 금정구",
        "query": "부산광역시 금정구",
        "fallbackLat": 35.1796,
        "fallbackLng": 129.0756,
        "zoom": 12
      },
      {
        "name": "연제구",
        "fullName": "부산광역시 연제구",
        "query": "부산광역시 연제구",
        "fallbackLat": 35.1796,
        "fallbackLng": 129.0756,
        "zoom": 12
      },
      {
        "name": "수영구",
        "fullName": "부산광역시 수영구",
        "query": "부산광역시 수영구",
        "fallbackLat": 35.1796,
        "fallbackLng": 129.0756,
        "zoom": 12
      },
      {
        "name": "사상구",
        "fullName": "부산광역시 사상구",
        "query": "부산광역시 사상구",
        "fallbackLat": 35.1796,
        "fallbackLng": 129.0756,
        "zoom": 12
      },
      {
        "name": "기장군",
        "fullName": "부산광역시 기장군",
        "query": "부산광역시 기장군",
        "fallbackLat": 35.1796,
        "fallbackLng": 129.0756,
        "zoom": 12
      }
    ]
  },
  {
    "name": "인천광역시",
    "shortName": "인천",
    "lat": 37.4563,
    "lng": 126.7052,
    "zoom": 10,
    "districts": [
      {
        "name": "중구",
        "fullName": "인천광역시 중구",
        "query": "인천광역시 중구",
        "fallbackLat": 37.4563,
        "fallbackLng": 126.7052,
        "zoom": 12
      },
      {
        "name": "동구",
        "fullName": "인천광역시 동구",
        "query": "인천광역시 동구",
        "fallbackLat": 37.4563,
        "fallbackLng": 126.7052,
        "zoom": 12
      },
      {
        "name": "미추홀구",
        "fullName": "인천광역시 미추홀구",
        "query": "인천광역시 미추홀구",
        "fallbackLat": 37.4563,
        "fallbackLng": 126.7052,
        "zoom": 12
      },
      {
        "name": "연수구",
        "fullName": "인천광역시 연수구",
        "query": "인천광역시 연수구",
        "fallbackLat": 37.4563,
        "fallbackLng": 126.7052,
        "zoom": 12
      },
      {
        "name": "남동구",
        "fullName": "인천광역시 남동구",
        "query": "인천광역시 남동구",
        "fallbackLat": 37.4563,
        "fallbackLng": 126.7052,
        "zoom": 12
      },
      {
        "name": "부평구",
        "fullName": "인천광역시 부평구",
        "query": "인천광역시 부평구",
        "fallbackLat": 37.4563,
        "fallbackLng": 126.7052,
        "zoom": 12
      },
      {
        "name": "계양구",
        "fullName": "인천광역시 계양구",
        "query": "인천광역시 계양구",
        "fallbackLat": 37.4563,
        "fallbackLng": 126.7052,
        "zoom": 12
      },
      {
        "name": "서구",
        "fullName": "인천광역시 서구",
        "query": "인천광역시 서구",
        "fallbackLat": 37.4563,
        "fallbackLng": 126.7052,
        "zoom": 12
      },
      {
        "name": "강화군",
        "fullName": "인천광역시 강화군",
        "query": "인천광역시 강화군",
        "fallbackLat": 37.4563,
        "fallbackLng": 126.7052,
        "zoom": 12
      },
      {
        "name": "옹진군",
        "fullName": "인천광역시 옹진군",
        "query": "인천광역시 옹진군",
        "fallbackLat": 37.4563,
        "fallbackLng": 126.7052,
        "zoom": 12
      }
    ]
  },
  {
    "name": "대구광역시",
    "shortName": "대구",
    "lat": 35.8714,
    "lng": 128.6014,
    "zoom": 11,
    "districts": [
      {
        "name": "중구",
        "fullName": "대구광역시 중구",
        "query": "대구광역시 중구",
        "fallbackLat": 35.8714,
        "fallbackLng": 128.6014,
        "zoom": 12
      },
      {
        "name": "동구",
        "fullName": "대구광역시 동구",
        "query": "대구광역시 동구",
        "fallbackLat": 35.8714,
        "fallbackLng": 128.6014,
        "zoom": 12
      },
      {
        "name": "서구",
        "fullName": "대구광역시 서구",
        "query": "대구광역시 서구",
        "fallbackLat": 35.8714,
        "fallbackLng": 128.6014,
        "zoom": 12
      },
      {
        "name": "남구",
        "fullName": "대구광역시 남구",
        "query": "대구광역시 남구",
        "fallbackLat": 35.8714,
        "fallbackLng": 128.6014,
        "zoom": 12
      },
      {
        "name": "북구",
        "fullName": "대구광역시 북구",
        "query": "대구광역시 북구",
        "fallbackLat": 35.8714,
        "fallbackLng": 128.6014,
        "zoom": 12
      },
      {
        "name": "수성구",
        "fullName": "대구광역시 수성구",
        "query": "대구광역시 수성구",
        "fallbackLat": 35.8714,
        "fallbackLng": 128.6014,
        "zoom": 12
      },
      {
        "name": "달서구",
        "fullName": "대구광역시 달서구",
        "query": "대구광역시 달서구",
        "fallbackLat": 35.8714,
        "fallbackLng": 128.6014,
        "zoom": 12
      },
      {
        "name": "달성군",
        "fullName": "대구광역시 달성군",
        "query": "대구광역시 달성군",
        "fallbackLat": 35.8714,
        "fallbackLng": 128.6014,
        "zoom": 12
      },
      {
        "name": "군위군",
        "fullName": "대구광역시 군위군",
        "query": "대구광역시 군위군",
        "fallbackLat": 35.8714,
        "fallbackLng": 128.6014,
        "zoom": 12
      }
    ]
  },
  {
    "name": "광주광역시",
    "shortName": "광주",
    "lat": 35.1595,
    "lng": 126.8526,
    "zoom": 11,
    "districts": [
      {
        "name": "동구",
        "fullName": "광주광역시 동구",
        "query": "광주광역시 동구",
        "fallbackLat": 35.1595,
        "fallbackLng": 126.8526,
        "zoom": 12
      },
      {
        "name": "서구",
        "fullName": "광주광역시 서구",
        "query": "광주광역시 서구",
        "fallbackLat": 35.1595,
        "fallbackLng": 126.8526,
        "zoom": 12
      },
      {
        "name": "남구",
        "fullName": "광주광역시 남구",
        "query": "광주광역시 남구",
        "fallbackLat": 35.1595,
        "fallbackLng": 126.8526,
        "zoom": 12
      },
      {
        "name": "북구",
        "fullName": "광주광역시 북구",
        "query": "광주광역시 북구",
        "fallbackLat": 35.1595,
        "fallbackLng": 126.8526,
        "zoom": 12
      },
      {
        "name": "광산구",
        "fullName": "광주광역시 광산구",
        "query": "광주광역시 광산구",
        "fallbackLat": 35.1595,
        "fallbackLng": 126.8526,
        "zoom": 12
      }
    ]
  },
  {
    "name": "대전광역시",
    "shortName": "대전",
    "lat": 36.3504,
    "lng": 127.3845,
    "zoom": 11,
    "districts": [
      {
        "name": "동구",
        "fullName": "대전광역시 동구",
        "query": "대전광역시 동구",
        "fallbackLat": 36.3504,
        "fallbackLng": 127.3845,
        "zoom": 12
      },
      {
        "name": "중구",
        "fullName": "대전광역시 중구",
        "query": "대전광역시 중구",
        "fallbackLat": 36.3504,
        "fallbackLng": 127.3845,
        "zoom": 12
      },
      {
        "name": "서구",
        "fullName": "대전광역시 서구",
        "query": "대전광역시 서구",
        "fallbackLat": 36.3504,
        "fallbackLng": 127.3845,
        "zoom": 12
      },
      {
        "name": "유성구",
        "fullName": "대전광역시 유성구",
        "query": "대전광역시 유성구",
        "fallbackLat": 36.3504,
        "fallbackLng": 127.3845,
        "zoom": 12
      },
      {
        "name": "대덕구",
        "fullName": "대전광역시 대덕구",
        "query": "대전광역시 대덕구",
        "fallbackLat": 36.3504,
        "fallbackLng": 127.3845,
        "zoom": 12
      }
    ]
  },
  {
    "name": "울산광역시",
    "shortName": "울산",
    "lat": 35.5384,
    "lng": 129.3114,
    "zoom": 10,
    "districts": [
      {
        "name": "중구",
        "fullName": "울산광역시 중구",
        "query": "울산광역시 중구",
        "fallbackLat": 35.5384,
        "fallbackLng": 129.3114,
        "zoom": 12
      },
      {
        "name": "남구",
        "fullName": "울산광역시 남구",
        "query": "울산광역시 남구",
        "fallbackLat": 35.5384,
        "fallbackLng": 129.3114,
        "zoom": 12
      },
      {
        "name": "동구",
        "fullName": "울산광역시 동구",
        "query": "울산광역시 동구",
        "fallbackLat": 35.5384,
        "fallbackLng": 129.3114,
        "zoom": 12
      },
      {
        "name": "북구",
        "fullName": "울산광역시 북구",
        "query": "울산광역시 북구",
        "fallbackLat": 35.5384,
        "fallbackLng": 129.3114,
        "zoom": 12
      },
      {
        "name": "울주군",
        "fullName": "울산광역시 울주군",
        "query": "울산광역시 울주군",
        "fallbackLat": 35.5384,
        "fallbackLng": 129.3114,
        "zoom": 12
      }
    ]
  },
  {
    "name": "세종특별자치시",
    "shortName": "세종",
    "lat": 36.48,
    "lng": 127.289,
    "zoom": 11,
    "districts": []
  },
  {
    "name": "경기도",
    "shortName": "경기",
    "lat": 37.4138,
    "lng": 127.5183,
    "zoom": 9,
    "districts": [
      {
        "name": "가평군",
        "fullName": "경기도 가평군",
        "query": "경기도 가평군",
        "fallbackLat": 37.4138,
        "fallbackLng": 127.5183,
        "zoom": 11
      },
      {
        "name": "고양시",
        "fullName": "경기도 고양시",
        "query": "경기도 고양시",
        "fallbackLat": 37.4138,
        "fallbackLng": 127.5183,
        "zoom": 11
      },
      {
        "name": "과천시",
        "fullName": "경기도 과천시",
        "query": "경기도 과천시",
        "fallbackLat": 37.4138,
        "fallbackLng": 127.5183,
        "zoom": 11
      },
      {
        "name": "광명시",
        "fullName": "경기도 광명시",
        "query": "경기도 광명시",
        "fallbackLat": 37.4138,
        "fallbackLng": 127.5183,
        "zoom": 11
      },
      {
        "name": "광주시",
        "fullName": "경기도 광주시",
        "query": "경기도 광주시",
        "fallbackLat": 37.4138,
        "fallbackLng": 127.5183,
        "zoom": 11
      },
      {
        "name": "구리시",
        "fullName": "경기도 구리시",
        "query": "경기도 구리시",
        "fallbackLat": 37.4138,
        "fallbackLng": 127.5183,
        "zoom": 11
      },
      {
        "name": "군포시",
        "fullName": "경기도 군포시",
        "query": "경기도 군포시",
        "fallbackLat": 37.4138,
        "fallbackLng": 127.5183,
        "zoom": 11
      },
      {
        "name": "김포시",
        "fullName": "경기도 김포시",
        "query": "경기도 김포시",
        "fallbackLat": 37.4138,
        "fallbackLng": 127.5183,
        "zoom": 11
      },
      {
        "name": "남양주시",
        "fullName": "경기도 남양주시",
        "query": "경기도 남양주시",
        "fallbackLat": 37.4138,
        "fallbackLng": 127.5183,
        "zoom": 11
      },
      {
        "name": "동두천시",
        "fullName": "경기도 동두천시",
        "query": "경기도 동두천시",
        "fallbackLat": 37.4138,
        "fallbackLng": 127.5183,
        "zoom": 11
      },
      {
        "name": "부천시",
        "fullName": "경기도 부천시",
        "query": "경기도 부천시",
        "fallbackLat": 37.4138,
        "fallbackLng": 127.5183,
        "zoom": 11
      },
      {
        "name": "성남시",
        "fullName": "경기도 성남시",
        "query": "경기도 성남시",
        "fallbackLat": 37.4138,
        "fallbackLng": 127.5183,
        "zoom": 11
      },
      {
        "name": "수원시",
        "fullName": "경기도 수원시",
        "query": "경기도 수원시",
        "fallbackLat": 37.4138,
        "fallbackLng": 127.5183,
        "zoom": 11
      },
      {
        "name": "시흥시",
        "fullName": "경기도 시흥시",
        "query": "경기도 시흥시",
        "fallbackLat": 37.4138,
        "fallbackLng": 127.5183,
        "zoom": 11
      },
      {
        "name": "안산시",
        "fullName": "경기도 안산시",
        "query": "경기도 안산시",
        "fallbackLat": 37.4138,
        "fallbackLng": 127.5183,
        "zoom": 11
      },
      {
        "name": "안성시",
        "fullName": "경기도 안성시",
        "query": "경기도 안성시",
        "fallbackLat": 37.4138,
        "fallbackLng": 127.5183,
        "zoom": 11
      },
      {
        "name": "안양시",
        "fullName": "경기도 안양시",
        "query": "경기도 안양시",
        "fallbackLat": 37.4138,
        "fallbackLng": 127.5183,
        "zoom": 11
      },
      {
        "name": "양주시",
        "fullName": "경기도 양주시",
        "query": "경기도 양주시",
        "fallbackLat": 37.4138,
        "fallbackLng": 127.5183,
        "zoom": 11
      },
      {
        "name": "양평군",
        "fullName": "경기도 양평군",
        "query": "경기도 양평군",
        "fallbackLat": 37.4138,
        "fallbackLng": 127.5183,
        "zoom": 11
      },
      {
        "name": "여주시",
        "fullName": "경기도 여주시",
        "query": "경기도 여주시",
        "fallbackLat": 37.4138,
        "fallbackLng": 127.5183,
        "zoom": 11
      },
      {
        "name": "연천군",
        "fullName": "경기도 연천군",
        "query": "경기도 연천군",
        "fallbackLat": 37.4138,
        "fallbackLng": 127.5183,
        "zoom": 11
      },
      {
        "name": "오산시",
        "fullName": "경기도 오산시",
        "query": "경기도 오산시",
        "fallbackLat": 37.4138,
        "fallbackLng": 127.5183,
        "zoom": 11
      },
      {
        "name": "용인시",
        "fullName": "경기도 용인시",
        "query": "경기도 용인시",
        "fallbackLat": 37.4138,
        "fallbackLng": 127.5183,
        "zoom": 11
      },
      {
        "name": "의왕시",
        "fullName": "경기도 의왕시",
        "query": "경기도 의왕시",
        "fallbackLat": 37.4138,
        "fallbackLng": 127.5183,
        "zoom": 11
      },
      {
        "name": "의정부시",
        "fullName": "경기도 의정부시",
        "query": "경기도 의정부시",
        "fallbackLat": 37.4138,
        "fallbackLng": 127.5183,
        "zoom": 11
      },
      {
        "name": "이천시",
        "fullName": "경기도 이천시",
        "query": "경기도 이천시",
        "fallbackLat": 37.4138,
        "fallbackLng": 127.5183,
        "zoom": 11
      },
      {
        "name": "파주시",
        "fullName": "경기도 파주시",
        "query": "경기도 파주시",
        "fallbackLat": 37.4138,
        "fallbackLng": 127.5183,
        "zoom": 11
      },
      {
        "name": "평택시",
        "fullName": "경기도 평택시",
        "query": "경기도 평택시",
        "fallbackLat": 37.4138,
        "fallbackLng": 127.5183,
        "zoom": 11
      },
      {
        "name": "포천시",
        "fullName": "경기도 포천시",
        "query": "경기도 포천시",
        "fallbackLat": 37.4138,
        "fallbackLng": 127.5183,
        "zoom": 11
      },
      {
        "name": "하남시",
        "fullName": "경기도 하남시",
        "query": "경기도 하남시",
        "fallbackLat": 37.4138,
        "fallbackLng": 127.5183,
        "zoom": 11
      },
      {
        "name": "화성시",
        "fullName": "경기도 화성시",
        "query": "경기도 화성시",
        "fallbackLat": 37.4138,
        "fallbackLng": 127.5183,
        "zoom": 11
      }
    ]
  },
  {
    "name": "강원특별자치도",
    "shortName": "강원",
    "lat": 37.8228,
    "lng": 128.1555,
    "zoom": 8,
    "districts": [
      {
        "name": "원주시",
        "fullName": "강원특별자치도 원주시",
        "query": "강원특별자치도 원주시",
        "fallbackLat": 37.8228,
        "fallbackLng": 128.1555,
        "zoom": 11
      },
      {
        "name": "춘천시",
        "fullName": "강원특별자치도 춘천시",
        "query": "강원특별자치도 춘천시",
        "fallbackLat": 37.8228,
        "fallbackLng": 128.1555,
        "zoom": 11
      },
      {
        "name": "강릉시",
        "fullName": "강원특별자치도 강릉시",
        "query": "강원특별자치도 강릉시",
        "fallbackLat": 37.8228,
        "fallbackLng": 128.1555,
        "zoom": 11
      },
      {
        "name": "동해시",
        "fullName": "강원특별자치도 동해시",
        "query": "강원특별자치도 동해시",
        "fallbackLat": 37.8228,
        "fallbackLng": 128.1555,
        "zoom": 11
      },
      {
        "name": "속초시",
        "fullName": "강원특별자치도 속초시",
        "query": "강원특별자치도 속초시",
        "fallbackLat": 37.8228,
        "fallbackLng": 128.1555,
        "zoom": 11
      },
      {
        "name": "삼척시",
        "fullName": "강원특별자치도 삼척시",
        "query": "강원특별자치도 삼척시",
        "fallbackLat": 37.8228,
        "fallbackLng": 128.1555,
        "zoom": 11
      },
      {
        "name": "홍천군",
        "fullName": "강원특별자치도 홍천군",
        "query": "강원특별자치도 홍천군",
        "fallbackLat": 37.8228,
        "fallbackLng": 128.1555,
        "zoom": 11
      },
      {
        "name": "태백시",
        "fullName": "강원특별자치도 태백시",
        "query": "강원특별자치도 태백시",
        "fallbackLat": 37.8228,
        "fallbackLng": 128.1555,
        "zoom": 11
      },
      {
        "name": "철원군",
        "fullName": "강원특별자치도 철원군",
        "query": "강원특별자치도 철원군",
        "fallbackLat": 37.8228,
        "fallbackLng": 128.1555,
        "zoom": 11
      },
      {
        "name": "횡성군",
        "fullName": "강원특별자치도 횡성군",
        "query": "강원특별자치도 횡성군",
        "fallbackLat": 37.8228,
        "fallbackLng": 128.1555,
        "zoom": 11
      },
      {
        "name": "평창군",
        "fullName": "강원특별자치도 평창군",
        "query": "강원특별자치도 평창군",
        "fallbackLat": 37.8228,
        "fallbackLng": 128.1555,
        "zoom": 11
      },
      {
        "name": "영월군",
        "fullName": "강원특별자치도 영월군",
        "query": "강원특별자치도 영월군",
        "fallbackLat": 37.8228,
        "fallbackLng": 128.1555,
        "zoom": 11
      },
      {
        "name": "정선군",
        "fullName": "강원특별자치도 정선군",
        "query": "강원특별자치도 정선군",
        "fallbackLat": 37.8228,
        "fallbackLng": 128.1555,
        "zoom": 11
      },
      {
        "name": "인제군",
        "fullName": "강원특별자치도 인제군",
        "query": "강원특별자치도 인제군",
        "fallbackLat": 37.8228,
        "fallbackLng": 128.1555,
        "zoom": 11
      },
      {
        "name": "고성군",
        "fullName": "강원특별자치도 고성군",
        "query": "강원특별자치도 고성군",
        "fallbackLat": 37.8228,
        "fallbackLng": 128.1555,
        "zoom": 11
      },
      {
        "name": "양양군",
        "fullName": "강원특별자치도 양양군",
        "query": "강원특별자치도 양양군",
        "fallbackLat": 37.8228,
        "fallbackLng": 128.1555,
        "zoom": 11
      },
      {
        "name": "화천군",
        "fullName": "강원특별자치도 화천군",
        "query": "강원특별자치도 화천군",
        "fallbackLat": 37.8228,
        "fallbackLng": 128.1555,
        "zoom": 11
      },
      {
        "name": "양구군",
        "fullName": "강원특별자치도 양구군",
        "query": "강원특별자치도 양구군",
        "fallbackLat": 37.8228,
        "fallbackLng": 128.1555,
        "zoom": 11
      }
    ]
  },
  {
    "name": "충청북도",
    "shortName": "충북",
    "lat": 36.8,
    "lng": 127.7,
    "zoom": 9,
    "districts": [
      {
        "name": "청주시",
        "fullName": "충청북도 청주시",
        "query": "충청북도 청주시",
        "fallbackLat": 36.8,
        "fallbackLng": 127.7,
        "zoom": 11
      },
      {
        "name": "충주시",
        "fullName": "충청북도 충주시",
        "query": "충청북도 충주시",
        "fallbackLat": 36.8,
        "fallbackLng": 127.7,
        "zoom": 11
      },
      {
        "name": "제천시",
        "fullName": "충청북도 제천시",
        "query": "충청북도 제천시",
        "fallbackLat": 36.8,
        "fallbackLng": 127.7,
        "zoom": 11
      },
      {
        "name": "보은군",
        "fullName": "충청북도 보은군",
        "query": "충청북도 보은군",
        "fallbackLat": 36.8,
        "fallbackLng": 127.7,
        "zoom": 11
      },
      {
        "name": "옥천군",
        "fullName": "충청북도 옥천군",
        "query": "충청북도 옥천군",
        "fallbackLat": 36.8,
        "fallbackLng": 127.7,
        "zoom": 11
      },
      {
        "name": "영동군",
        "fullName": "충청북도 영동군",
        "query": "충청북도 영동군",
        "fallbackLat": 36.8,
        "fallbackLng": 127.7,
        "zoom": 11
      },
      {
        "name": "증평군",
        "fullName": "충청북도 증평군",
        "query": "충청북도 증평군",
        "fallbackLat": 36.8,
        "fallbackLng": 127.7,
        "zoom": 11
      },
      {
        "name": "진천군",
        "fullName": "충청북도 진천군",
        "query": "충청북도 진천군",
        "fallbackLat": 36.8,
        "fallbackLng": 127.7,
        "zoom": 11
      },
      {
        "name": "괴산군",
        "fullName": "충청북도 괴산군",
        "query": "충청북도 괴산군",
        "fallbackLat": 36.8,
        "fallbackLng": 127.7,
        "zoom": 11
      },
      {
        "name": "음성군",
        "fullName": "충청북도 음성군",
        "query": "충청북도 음성군",
        "fallbackLat": 36.8,
        "fallbackLng": 127.7,
        "zoom": 11
      },
      {
        "name": "단양군",
        "fullName": "충청북도 단양군",
        "query": "충청북도 단양군",
        "fallbackLat": 36.8,
        "fallbackLng": 127.7,
        "zoom": 11
      }
    ]
  },
  {
    "name": "충청남도",
    "shortName": "충남",
    "lat": 36.5184,
    "lng": 126.8,
    "zoom": 9,
    "districts": [
      {
        "name": "천안시",
        "fullName": "충청남도 천안시",
        "query": "충청남도 천안시",
        "fallbackLat": 36.5184,
        "fallbackLng": 126.8,
        "zoom": 11
      },
      {
        "name": "공주시",
        "fullName": "충청남도 공주시",
        "query": "충청남도 공주시",
        "fallbackLat": 36.5184,
        "fallbackLng": 126.8,
        "zoom": 11
      },
      {
        "name": "보령시",
        "fullName": "충청남도 보령시",
        "query": "충청남도 보령시",
        "fallbackLat": 36.5184,
        "fallbackLng": 126.8,
        "zoom": 11
      },
      {
        "name": "아산시",
        "fullName": "충청남도 아산시",
        "query": "충청남도 아산시",
        "fallbackLat": 36.5184,
        "fallbackLng": 126.8,
        "zoom": 11
      },
      {
        "name": "서산시",
        "fullName": "충청남도 서산시",
        "query": "충청남도 서산시",
        "fallbackLat": 36.5184,
        "fallbackLng": 126.8,
        "zoom": 11
      },
      {
        "name": "논산시",
        "fullName": "충청남도 논산시",
        "query": "충청남도 논산시",
        "fallbackLat": 36.5184,
        "fallbackLng": 126.8,
        "zoom": 11
      },
      {
        "name": "계룡시",
        "fullName": "충청남도 계룡시",
        "query": "충청남도 계룡시",
        "fallbackLat": 36.5184,
        "fallbackLng": 126.8,
        "zoom": 11
      },
      {
        "name": "당진시",
        "fullName": "충청남도 당진시",
        "query": "충청남도 당진시",
        "fallbackLat": 36.5184,
        "fallbackLng": 126.8,
        "zoom": 11
      },
      {
        "name": "금산군",
        "fullName": "충청남도 금산군",
        "query": "충청남도 금산군",
        "fallbackLat": 36.5184,
        "fallbackLng": 126.8,
        "zoom": 11
      },
      {
        "name": "부여군",
        "fullName": "충청남도 부여군",
        "query": "충청남도 부여군",
        "fallbackLat": 36.5184,
        "fallbackLng": 126.8,
        "zoom": 11
      },
      {
        "name": "서천군",
        "fullName": "충청남도 서천군",
        "query": "충청남도 서천군",
        "fallbackLat": 36.5184,
        "fallbackLng": 126.8,
        "zoom": 11
      },
      {
        "name": "청양군",
        "fullName": "충청남도 청양군",
        "query": "충청남도 청양군",
        "fallbackLat": 36.5184,
        "fallbackLng": 126.8,
        "zoom": 11
      },
      {
        "name": "홍성군",
        "fullName": "충청남도 홍성군",
        "query": "충청남도 홍성군",
        "fallbackLat": 36.5184,
        "fallbackLng": 126.8,
        "zoom": 11
      },
      {
        "name": "예산군",
        "fullName": "충청남도 예산군",
        "query": "충청남도 예산군",
        "fallbackLat": 36.5184,
        "fallbackLng": 126.8,
        "zoom": 11
      },
      {
        "name": "태안군",
        "fullName": "충청남도 태안군",
        "query": "충청남도 태안군",
        "fallbackLat": 36.5184,
        "fallbackLng": 126.8,
        "zoom": 11
      }
    ]
  },
  {
    "name": "경상북도",
    "shortName": "경북",
    "lat": 36.4919,
    "lng": 128.8889,
    "zoom": 8,
    "districts": [
      {
        "name": "포항시",
        "fullName": "경상북도 포항시",
        "query": "경상북도 포항시",
        "fallbackLat": 36.4919,
        "fallbackLng": 128.8889,
        "zoom": 11
      },
      {
        "name": "경주시",
        "fullName": "경상북도 경주시",
        "query": "경상북도 경주시",
        "fallbackLat": 36.4919,
        "fallbackLng": 128.8889,
        "zoom": 11
      },
      {
        "name": "김천시",
        "fullName": "경상북도 김천시",
        "query": "경상북도 김천시",
        "fallbackLat": 36.4919,
        "fallbackLng": 128.8889,
        "zoom": 11
      },
      {
        "name": "안동시",
        "fullName": "경상북도 안동시",
        "query": "경상북도 안동시",
        "fallbackLat": 36.4919,
        "fallbackLng": 128.8889,
        "zoom": 11
      },
      {
        "name": "구미시",
        "fullName": "경상북도 구미시",
        "query": "경상북도 구미시",
        "fallbackLat": 36.4919,
        "fallbackLng": 128.8889,
        "zoom": 11
      },
      {
        "name": "영주시",
        "fullName": "경상북도 영주시",
        "query": "경상북도 영주시",
        "fallbackLat": 36.4919,
        "fallbackLng": 128.8889,
        "zoom": 11
      },
      {
        "name": "영천시",
        "fullName": "경상북도 영천시",
        "query": "경상북도 영천시",
        "fallbackLat": 36.4919,
        "fallbackLng": 128.8889,
        "zoom": 11
      },
      {
        "name": "상주시",
        "fullName": "경상북도 상주시",
        "query": "경상북도 상주시",
        "fallbackLat": 36.4919,
        "fallbackLng": 128.8889,
        "zoom": 11
      },
      {
        "name": "문경시",
        "fullName": "경상북도 문경시",
        "query": "경상북도 문경시",
        "fallbackLat": 36.4919,
        "fallbackLng": 128.8889,
        "zoom": 11
      },
      {
        "name": "경산시",
        "fullName": "경상북도 경산시",
        "query": "경상북도 경산시",
        "fallbackLat": 36.4919,
        "fallbackLng": 128.8889,
        "zoom": 11
      },
      {
        "name": "의성군",
        "fullName": "경상북도 의성군",
        "query": "경상북도 의성군",
        "fallbackLat": 36.4919,
        "fallbackLng": 128.8889,
        "zoom": 11
      },
      {
        "name": "청송군",
        "fullName": "경상북도 청송군",
        "query": "경상북도 청송군",
        "fallbackLat": 36.4919,
        "fallbackLng": 128.8889,
        "zoom": 11
      },
      {
        "name": "영양군",
        "fullName": "경상북도 영양군",
        "query": "경상북도 영양군",
        "fallbackLat": 36.4919,
        "fallbackLng": 128.8889,
        "zoom": 11
      },
      {
        "name": "영덕군",
        "fullName": "경상북도 영덕군",
        "query": "경상북도 영덕군",
        "fallbackLat": 36.4919,
        "fallbackLng": 128.8889,
        "zoom": 11
      },
      {
        "name": "청도군",
        "fullName": "경상북도 청도군",
        "query": "경상북도 청도군",
        "fallbackLat": 36.4919,
        "fallbackLng": 128.8889,
        "zoom": 11
      },
      {
        "name": "고령군",
        "fullName": "경상북도 고령군",
        "query": "경상북도 고령군",
        "fallbackLat": 36.4919,
        "fallbackLng": 128.8889,
        "zoom": 11
      },
      {
        "name": "성주군",
        "fullName": "경상북도 성주군",
        "query": "경상북도 성주군",
        "fallbackLat": 36.4919,
        "fallbackLng": 128.8889,
        "zoom": 11
      },
      {
        "name": "칠곡군",
        "fullName": "경상북도 칠곡군",
        "query": "경상북도 칠곡군",
        "fallbackLat": 36.4919,
        "fallbackLng": 128.8889,
        "zoom": 11
      },
      {
        "name": "예천군",
        "fullName": "경상북도 예천군",
        "query": "경상북도 예천군",
        "fallbackLat": 36.4919,
        "fallbackLng": 128.8889,
        "zoom": 11
      },
      {
        "name": "봉화군",
        "fullName": "경상북도 봉화군",
        "query": "경상북도 봉화군",
        "fallbackLat": 36.4919,
        "fallbackLng": 128.8889,
        "zoom": 11
      },
      {
        "name": "울진군",
        "fullName": "경상북도 울진군",
        "query": "경상북도 울진군",
        "fallbackLat": 36.4919,
        "fallbackLng": 128.8889,
        "zoom": 11
      },
      {
        "name": "울릉군",
        "fullName": "경상북도 울릉군",
        "query": "경상북도 울릉군",
        "fallbackLat": 36.4919,
        "fallbackLng": 128.8889,
        "zoom": 11
      }
    ]
  },
  {
    "name": "경상남도",
    "shortName": "경남",
    "lat": 35.4606,
    "lng": 128.2132,
    "zoom": 9,
    "districts": [
      {
        "name": "창원시",
        "fullName": "경상남도 창원시",
        "query": "경상남도 창원시",
        "fallbackLat": 35.4606,
        "fallbackLng": 128.2132,
        "zoom": 11
      },
      {
        "name": "김해시",
        "fullName": "경상남도 김해시",
        "query": "경상남도 김해시",
        "fallbackLat": 35.4606,
        "fallbackLng": 128.2132,
        "zoom": 11
      },
      {
        "name": "진주시",
        "fullName": "경상남도 진주시",
        "query": "경상남도 진주시",
        "fallbackLat": 35.4606,
        "fallbackLng": 128.2132,
        "zoom": 11
      },
      {
        "name": "양산시",
        "fullName": "경상남도 양산시",
        "query": "경상남도 양산시",
        "fallbackLat": 35.4606,
        "fallbackLng": 128.2132,
        "zoom": 11
      },
      {
        "name": "거제시",
        "fullName": "경상남도 거제시",
        "query": "경상남도 거제시",
        "fallbackLat": 35.4606,
        "fallbackLng": 128.2132,
        "zoom": 11
      },
      {
        "name": "통영시",
        "fullName": "경상남도 통영시",
        "query": "경상남도 통영시",
        "fallbackLat": 35.4606,
        "fallbackLng": 128.2132,
        "zoom": 11
      },
      {
        "name": "사천시",
        "fullName": "경상남도 사천시",
        "query": "경상남도 사천시",
        "fallbackLat": 35.4606,
        "fallbackLng": 128.2132,
        "zoom": 11
      },
      {
        "name": "밀양시",
        "fullName": "경상남도 밀양시",
        "query": "경상남도 밀양시",
        "fallbackLat": 35.4606,
        "fallbackLng": 128.2132,
        "zoom": 11
      },
      {
        "name": "함안군",
        "fullName": "경상남도 함안군",
        "query": "경상남도 함안군",
        "fallbackLat": 35.4606,
        "fallbackLng": 128.2132,
        "zoom": 11
      },
      {
        "name": "거창군",
        "fullName": "경상남도 거창군",
        "query": "경상남도 거창군",
        "fallbackLat": 35.4606,
        "fallbackLng": 128.2132,
        "zoom": 11
      },
      {
        "name": "창녕군",
        "fullName": "경상남도 창녕군",
        "query": "경상남도 창녕군",
        "fallbackLat": 35.4606,
        "fallbackLng": 128.2132,
        "zoom": 11
      },
      {
        "name": "고성군",
        "fullName": "경상남도 고성군",
        "query": "경상남도 고성군",
        "fallbackLat": 35.4606,
        "fallbackLng": 128.2132,
        "zoom": 11
      },
      {
        "name": "하동군",
        "fullName": "경상남도 하동군",
        "query": "경상남도 하동군",
        "fallbackLat": 35.4606,
        "fallbackLng": 128.2132,
        "zoom": 11
      },
      {
        "name": "합천군",
        "fullName": "경상남도 합천군",
        "query": "경상남도 합천군",
        "fallbackLat": 35.4606,
        "fallbackLng": 128.2132,
        "zoom": 11
      },
      {
        "name": "남해군",
        "fullName": "경상남도 남해군",
        "query": "경상남도 남해군",
        "fallbackLat": 35.4606,
        "fallbackLng": 128.2132,
        "zoom": 11
      },
      {
        "name": "함양군",
        "fullName": "경상남도 함양군",
        "query": "경상남도 함양군",
        "fallbackLat": 35.4606,
        "fallbackLng": 128.2132,
        "zoom": 11
      },
      {
        "name": "산청군",
        "fullName": "경상남도 산청군",
        "query": "경상남도 산청군",
        "fallbackLat": 35.4606,
        "fallbackLng": 128.2132,
        "zoom": 11
      },
      {
        "name": "의령군",
        "fullName": "경상남도 의령군",
        "query": "경상남도 의령군",
        "fallbackLat": 35.4606,
        "fallbackLng": 128.2132,
        "zoom": 11
      }
    ]
  },
  {
    "name": "전북특별자치도",
    "shortName": "전북",
    "lat": 35.7175,
    "lng": 127.153,
    "zoom": 9,
    "districts": [
      {
        "name": "전주시",
        "fullName": "전북특별자치도 전주시",
        "query": "전북특별자치도 전주시",
        "fallbackLat": 35.7175,
        "fallbackLng": 127.153,
        "zoom": 11
      },
      {
        "name": "익산시",
        "fullName": "전북특별자치도 익산시",
        "query": "전북특별자치도 익산시",
        "fallbackLat": 35.7175,
        "fallbackLng": 127.153,
        "zoom": 11
      },
      {
        "name": "군산시",
        "fullName": "전북특별자치도 군산시",
        "query": "전북특별자치도 군산시",
        "fallbackLat": 35.7175,
        "fallbackLng": 127.153,
        "zoom": 11
      },
      {
        "name": "정읍시",
        "fullName": "전북특별자치도 정읍시",
        "query": "전북특별자치도 정읍시",
        "fallbackLat": 35.7175,
        "fallbackLng": 127.153,
        "zoom": 11
      },
      {
        "name": "완주군",
        "fullName": "전북특별자치도 완주군",
        "query": "전북특별자치도 완주군",
        "fallbackLat": 35.7175,
        "fallbackLng": 127.153,
        "zoom": 11
      },
      {
        "name": "김제시",
        "fullName": "전북특별자치도 김제시",
        "query": "전북특별자치도 김제시",
        "fallbackLat": 35.7175,
        "fallbackLng": 127.153,
        "zoom": 11
      },
      {
        "name": "남원시",
        "fullName": "전북특별자치도 남원시",
        "query": "전북특별자치도 남원시",
        "fallbackLat": 35.7175,
        "fallbackLng": 127.153,
        "zoom": 11
      },
      {
        "name": "고창군",
        "fullName": "전북특별자치도 고창군",
        "query": "전북특별자치도 고창군",
        "fallbackLat": 35.7175,
        "fallbackLng": 127.153,
        "zoom": 11
      },
      {
        "name": "부안군",
        "fullName": "전북특별자치도 부안군",
        "query": "전북특별자치도 부안군",
        "fallbackLat": 35.7175,
        "fallbackLng": 127.153,
        "zoom": 11
      },
      {
        "name": "임실군",
        "fullName": "전북특별자치도 임실군",
        "query": "전북특별자치도 임실군",
        "fallbackLat": 35.7175,
        "fallbackLng": 127.153,
        "zoom": 11
      },
      {
        "name": "순창군",
        "fullName": "전북특별자치도 순창군",
        "query": "전북특별자치도 순창군",
        "fallbackLat": 35.7175,
        "fallbackLng": 127.153,
        "zoom": 11
      },
      {
        "name": "진안군",
        "fullName": "전북특별자치도 진안군",
        "query": "전북특별자치도 진안군",
        "fallbackLat": 35.7175,
        "fallbackLng": 127.153,
        "zoom": 11
      },
      {
        "name": "장수군",
        "fullName": "전북특별자치도 장수군",
        "query": "전북특별자치도 장수군",
        "fallbackLat": 35.7175,
        "fallbackLng": 127.153,
        "zoom": 11
      },
      {
        "name": "무주군",
        "fullName": "전북특별자치도 무주군",
        "query": "전북특별자치도 무주군",
        "fallbackLat": 35.7175,
        "fallbackLng": 127.153,
        "zoom": 11
      }
    ]
  },
  {
    "name": "전라남도",
    "shortName": "전남",
    "lat": 34.8679,
    "lng": 126.991,
    "zoom": 9,
    "districts": [
      {
        "name": "여수시",
        "fullName": "전라남도 여수시",
        "query": "전라남도 여수시",
        "fallbackLat": 34.8679,
        "fallbackLng": 126.991,
        "zoom": 11
      },
      {
        "name": "순천시",
        "fullName": "전라남도 순천시",
        "query": "전라남도 순천시",
        "fallbackLat": 34.8679,
        "fallbackLng": 126.991,
        "zoom": 11
      },
      {
        "name": "목포시",
        "fullName": "전라남도 목포시",
        "query": "전라남도 목포시",
        "fallbackLat": 34.8679,
        "fallbackLng": 126.991,
        "zoom": 11
      },
      {
        "name": "광양시",
        "fullName": "전라남도 광양시",
        "query": "전라남도 광양시",
        "fallbackLat": 34.8679,
        "fallbackLng": 126.991,
        "zoom": 11
      },
      {
        "name": "나주시",
        "fullName": "전라남도 나주시",
        "query": "전라남도 나주시",
        "fallbackLat": 34.8679,
        "fallbackLng": 126.991,
        "zoom": 11
      },
      {
        "name": "무안군",
        "fullName": "전라남도 무안군",
        "query": "전라남도 무안군",
        "fallbackLat": 34.8679,
        "fallbackLng": 126.991,
        "zoom": 11
      },
      {
        "name": "해남군",
        "fullName": "전라남도 해남군",
        "query": "전라남도 해남군",
        "fallbackLat": 34.8679,
        "fallbackLng": 126.991,
        "zoom": 11
      },
      {
        "name": "고흥군",
        "fullName": "전라남도 고흥군",
        "query": "전라남도 고흥군",
        "fallbackLat": 34.8679,
        "fallbackLng": 126.991,
        "zoom": 11
      },
      {
        "name": "화순군",
        "fullName": "전라남도 화순군",
        "query": "전라남도 화순군",
        "fallbackLat": 34.8679,
        "fallbackLng": 126.991,
        "zoom": 11
      },
      {
        "name": "영암군",
        "fullName": "전라남도 영암군",
        "query": "전라남도 영암군",
        "fallbackLat": 34.8679,
        "fallbackLng": 126.991,
        "zoom": 11
      },
      {
        "name": "영광군",
        "fullName": "전라남도 영광군",
        "query": "전라남도 영광군",
        "fallbackLat": 34.8679,
        "fallbackLng": 126.991,
        "zoom": 11
      },
      {
        "name": "완도군",
        "fullName": "전라남도 완도군",
        "query": "전라남도 완도군",
        "fallbackLat": 34.8679,
        "fallbackLng": 126.991,
        "zoom": 11
      },
      {
        "name": "담양군",
        "fullName": "전라남도 담양군",
        "query": "전라남도 담양군",
        "fallbackLat": 34.8679,
        "fallbackLng": 126.991,
        "zoom": 11
      },
      {
        "name": "장성군",
        "fullName": "전라남도 장성군",
        "query": "전라남도 장성군",
        "fallbackLat": 34.8679,
        "fallbackLng": 126.991,
        "zoom": 11
      },
      {
        "name": "보성군",
        "fullName": "전라남도 보성군",
        "query": "전라남도 보성군",
        "fallbackLat": 34.8679,
        "fallbackLng": 126.991,
        "zoom": 11
      },
      {
        "name": "신안군",
        "fullName": "전라남도 신안군",
        "query": "전라남도 신안군",
        "fallbackLat": 34.8679,
        "fallbackLng": 126.991,
        "zoom": 11
      },
      {
        "name": "장흥군",
        "fullName": "전라남도 장흥군",
        "query": "전라남도 장흥군",
        "fallbackLat": 34.8679,
        "fallbackLng": 126.991,
        "zoom": 11
      },
      {
        "name": "강진군",
        "fullName": "전라남도 강진군",
        "query": "전라남도 강진군",
        "fallbackLat": 34.8679,
        "fallbackLng": 126.991,
        "zoom": 11
      },
      {
        "name": "함평군",
        "fullName": "전라남도 함평군",
        "query": "전라남도 함평군",
        "fallbackLat": 34.8679,
        "fallbackLng": 126.991,
        "zoom": 11
      },
      {
        "name": "진도군",
        "fullName": "전라남도 진도군",
        "query": "전라남도 진도군",
        "fallbackLat": 34.8679,
        "fallbackLng": 126.991,
        "zoom": 11
      },
      {
        "name": "곡성군",
        "fullName": "전라남도 곡성군",
        "query": "전라남도 곡성군",
        "fallbackLat": 34.8679,
        "fallbackLng": 126.991,
        "zoom": 11
      },
      {
        "name": "구례군",
        "fullName": "전라남도 구례군",
        "query": "전라남도 구례군",
        "fallbackLat": 34.8679,
        "fallbackLng": 126.991,
        "zoom": 11
      }
    ]
  },
  {
    "name": "제주특별자치도",
    "shortName": "제주",
    "lat": 33.4996,
    "lng": 126.5312,
    "zoom": 10,
    "districts": [
      {
        "name": "제주시",
        "fullName": "제주특별자치도 제주시",
        "query": "제주특별자치도 제주시",
        "fallbackLat": 33.4996,
        "fallbackLng": 126.5312,
        "zoom": 11
      },
      {
        "name": "서귀포시",
        "fullName": "제주특별자치도 서귀포시",
        "query": "제주특별자치도 서귀포시",
        "fallbackLat": 33.4996,
        "fallbackLng": 126.5312,
        "zoom": 11
      }
    ]
  }
] as const satisfies ProvinceOption[];
