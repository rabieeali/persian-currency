import React from 'react'

interface PersianNumberProps {
    value?: number
    unit?: string
    style?: React.CSSProperties
    className?: string
}

export const PersianNumber: React.FC<PersianNumberProps> = ({ value = 0, unit, style, className }) => {
    const delimiter = ' و '
    const zero = 'صفر'
    const negative = 'منفی '
    const letters = [
        ['', 'یک', 'دو', 'سه', 'چهار', 'پنج', 'شش', 'هفت', 'هشت', 'نه'],
        ['ده', 'یازده', 'دوازده', 'سیزده', 'چهارده', 'پانزده', 'شانزده', 'هفده', 'هجده', 'نوزده', 'بیست'],
        ['', '', 'بیست', 'سی', 'چهل', 'پنجاه', 'شصت', 'هفتاد', 'هشتاد', 'نود'],
        ['', 'یکصد', 'دویست', 'سیصد', 'چهارصد', 'پانصد', 'ششصد', 'هفتصد', 'هشتصد', 'نهصد'],
        [
            '',
            ' هزار',
            ' میلیون',
            ' میلیارد',
            ' بیلیون',
            ' بیلیارد',
            ' تریلیون',
            ' تریلیارد',
            ' کوآدریلیون',
            ' کادریلیارد',
            ' کوینتیلیون',
            ' کوانتینیارد',
            ' سکستیلیون',
            ' سکستیلیارد',
            ' سپتیلیون',
            ' سپتیلیارد',
            ' اکتیلیون',
            ' اکتیلیارد',
            ' نانیلیون',
            ' نانیلیارد',
            ' دسیلیون',
            ' دسیلیارد',
        ],
    ]
    const decimalSuffixes = [
        '',
        'دهم',
        'صدم',
        'هزارم',
        'ده‌هزارم',
        'صد‌هزارم',
        'میلیونوم',
        'ده‌میلیونوم',
        'صدمیلیونوم',
        'میلیاردم',
        'ده‌میلیاردم',
        'صد‌‌میلیاردم',
    ]

    const prepareNumber = (num: number) => {
        let out = num.toString()

        if (out.length % 3 === 1) {
            out = '00' + out
        } else if (out.length % 3 === 2) {
            out = '0' + out
        }

        return out.replace(/\d{3}(?=\d)/g, '$&*').split('*')
    }

    const tinyNumToWord = (num: string) => {
        if (parseInt(num, 0) === 0) {
            return ''
        }

        const parsedInt = parseInt(num, 0)

        if (parsedInt < 10) {
            return letters[0][parsedInt]
        }

        if (parsedInt <= 20) {
            return letters[1][parsedInt - 10]
        }

        if (parsedInt < 100) {
            const one = parsedInt % 10
            const ten = (parsedInt - one) / 10

            if (one > 0) {
                return letters[2][ten] + delimiter + letters[0][one]
            }

            return letters[2][ten]
        }

        const one = parsedInt % 10
        const hundreds = (parsedInt - (parsedInt % 100)) / 100
        const ten = (parsedInt - (hundreds * 100 + one)) / 10
        const out = [letters[3][hundreds]]
        const secondPart = ten * 10 + one

        if (secondPart === 0) {
            return out.join(delimiter)
        }

        if (secondPart < 10) {
            out.push(letters[0][secondPart])
        } else if (secondPart <= 20) {
            out.push(letters[1][secondPart - 10])
        } else {
            out.push(letters[2][ten])

            if (one > 0) {
                out.push(letters[0][one])
            }
        }

        return out.join(delimiter)
    }

    const convertDecimalPart = (decimalPart: string) => {
        decimalPart = decimalPart.replace(/0*$/, '')

        if (decimalPart === '') {
            return ''
        }

        if (decimalPart.length > 11) {
            decimalPart = decimalPart.substr(0, 11)
        }

        return ' ممیز ' + Num2persian(decimalPart) + ' ' + decimalSuffixes[decimalPart.length]
    }

    const Num2persian = (input: string) => {
        input = input.replace(/[^0-9.-]/g, '')
        const isNegative = false
        const floatParse = parseFloat(input)

        if (isNaN(floatParse)) {
            return zero
        }

        if (floatParse === 0) {
            return zero
        }

        if (floatParse < 0) {
            input = input.replace(/-/g, '')
        }

        let decimalPart = ''
        let integerPart = input
        const pointIndex = input.indexOf('.')

        if (pointIndex > -1) {
            integerPart = input.substring(0, pointIndex)
            decimalPart = input.substring(pointIndex + 1, input.length)
        }

        if (integerPart.length > 66) {
            return 'خارج از محدوده'
        }

        const slicedNumber = prepareNumber(parseFloat(integerPart))
        const out: string[] = []

        for (let i = 0; i < slicedNumber.length; i += 1) {
            const converted = tinyNumToWord(slicedNumber[i])

            if (converted !== '') {
                out.push(converted + letters[4][slicedNumber.length - (i + 1)])
            }
        }

        if (decimalPart.length > 0) {
            decimalPart = convertDecimalPart(decimalPart)
        }

        return (isNegative ? negative : '') + out.join(delimiter) + decimalPart
    }

    return (
        <p className={`price_small_number ${className ?? ''}`} style={style}>
            {!!value && Num2persian(value.toString())} {!!value && unit}
        </p>
    )
}