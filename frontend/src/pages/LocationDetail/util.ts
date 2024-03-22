export const keyToString = (key: string): string => {
    const keyMap: { [key: string]: string } = {
        tel: '문의 및 안내',
        creditCard: '신용카드사용여부',
        parking: '주차시설',
        openTime: '영업시간',
        petsAvailable: '애완동물가능여부',
        babyEquipmentRental: '유모차 대여',
        closedForTheDay: '휴일',
        bestMenu: '대표메뉴',
        restDate: '쉬는날',
        timeAvailable: '이용시간',
        saleItems: '판매품목',
        takeOut: '포장가능여부',
        fairDay: '장서는날',
        smokingSectionAvailable: '금연/흡연',
        reservation: '예약안내',
        fee: '입장료',
        occupancy: '수용가능인원',
        ageLimit: '체험가능연령',
        scale: '시설 규모',
        startDate: '이벤트 시작일',
        endDate: '종료일',
        showTime: '공연시간',
        parkingFee: '주차요금',
        travelTime: '관람소요시간',
        discount: '할인정보',
        ageAvailable: '관람가능연령',
        seasons: '이용시기',
        timeRequired: '관람소요시간',
        program: '행사프로그램',
    }

    return keyMap[key] || key
}