/** 
* Enumeration of iKBADC.
*/
enum iKBADC {
    //% block="ADC 0"
    ADC0 = 0x00,
    //% block="ADC 1"
    ADC1 = 0x10,
    //% block="ADC 2"
    ADC2 = 0x20,
    //% block="ADC 3"
    ADC3 = 0x30,
    //% block="ADC 4"
    ADC4 = 0x40,
    //% block="ADC 5"
    ADC5 = 0x50,
    //% block="ADC 6"
    ADC6 = 0x60,
    //% block="ADC 7"
    ADC7 = 0x70
}

enum pinx {
    //% block="0"
    D0,
    //% block="1"
    D1,
    //% block="2"
    D2,
    //% block="3"
    D3,
    //% block="4"
    D4,
    //% block="5"
    D5,
    //% block="6"
    D6,
    //% block="7"
    D7
}
enum st {
    //% block="0"
    OFF,
    //% block="1"
    ON
}
enum sv {
    //% block="10"
    SV10,
    //% block="11"
    SV11,
    //% block="12"
    SV12,
    //% block="13"
    SV13,
    //% block="14"
    SV14,
    //% block="15"
    SV15
}


/**
 * Custom blocks
 */
//% weight=1 color=#31a751 icon="\uf085"
namespace iKB1 {
    /**
     * ฟังก์ชั่นสำหรับการติดต่อกับบอร์ด iKB
     * @param n describe parameter here, eg: 5
     * @param s describe parameter here, eg: "Hello"
     * @param e describe parameter here
     */

    //% blockId="out" block="OUT pin %pinx| to %st "
    //% weight=75
    export function out(p: pinx, st: st): void {
        pins.i2cWriteNumber(72, ((8 + p) * 256) + st, NumberFormat.UInt16BE, false)
    }

    //% blockId="sv" block="Servo CH %sv | angle %Angle "
    //% Angle.min=-1  Angle.max=200
    //% weight=75
    export function servo(CH: sv, Angle: number): void {
        pins.i2cWriteNumber(72, ((0x41+(CH*8)) * 256) + Angle, NumberFormat.UInt16BE, false)
    }

    //% blockId="in" block="in pin %pinx "
    //% weight=50
    export function In(p: pinx): number {
        pins.i2cWriteNumber(72, ((8 + p) * 256) + 2, NumberFormat.UInt16BE, false)
        return pins.i2cReadNumber(72, NumberFormat.UInt8BE, false)
    }
    //% blockId="in_p" block="in pullup pin %pinx "
    //% weight=50
    export function In_p(p: pinx): number {
        pins.i2cWriteNumber(72, ((8 + p) * 256) + 3, NumberFormat.UInt16BE, false)
        return pins.i2cReadNumber(72, NumberFormat.UInt8BE, false)
    }

    /**ReadADC for read analog sensor, Select ADC channel 0-7. 
         *
         */
    //% blockId="iKBADC" block="Read %iKBADC"
    //% weight=75
    export function iKBADC(ADC_CH: iKBADC): number {
        let ADCValue: number;
        pins.i2cWriteNumber(72, 0x80 + ADC_CH, NumberFormat.UInt8LE, false)
        return pins.i2cReadNumber(72, NumberFormat.UInt16BE, false)
    }
    //% blockId="IKB_reset" block="iKB Reset"
    //% weight=90
    export function iKB_Reset(): void {
        pins.i2cWriteNumber(72, 0, NumberFormat.UInt8BE, false)
    }



    //% blockId="fd" block="FD speed %Speed "
    //% Speed.min=0  Speed.max=100
    //% weight=75
    export function fd(Speed: number): void {
        pins.i2cWriteNumber(72, (0x23 * 256) + Speed, NumberFormat.UInt16BE, false)
    }

    //% blockId="fd2" block="FD Left %Speed || Right %Speed"
    //% Speed.min=0  Speed.max=100
    //% weight=75
    export function fd2(SpeedLeft: number, SpeedRight : number): void {
        pins.i2cWriteNumber(72, (0x21 * 256) + SpeedLeft, NumberFormat.UInt16BE, false)
        pins.i2cWriteNumber(72, (0x21 * 256) + SpeedRight, NumberFormat.UInt16BE, false)
    }

    //% blockId="bk2" block="BK Left %Speed || Right %Speed"
    //% Speed.min=0  Speed.max=100
    //% weight=75
    export function bk2(SpeedLeft: number, SpeedRight: number): void {
        pins.i2cWriteNumber(72, (0x21 * 256) + (256-SpeedLeft), NumberFormat.UInt16BE, false)
        pins.i2cWriteNumber(72, (0x21 * 256) + (256-SpeedRight), NumberFormat.UInt16BE, false)
    }

    //% blockId="bk" block="BK speed %Speed "
    //% Speed.min=0  Speed.max=100
    //% weight=74
    export function bk(Speed: number): void {
        pins.i2cWriteNumber(72, (0x23 * 256) + (256 - Speed), NumberFormat.UInt16BE, false)
    }

    //% blockId="sl" block="SL speed %Speed "
    //% Speed.min=0  Speed.max=100
    //% weight=73
    export function sl(Speed: number): void {
        pins.i2cWriteNumber(72, (0x21 * 256) + (Speed), NumberFormat.UInt16BE, false)
        pins.i2cWriteNumber(72, (0x22 * 256) + (256 - Speed), NumberFormat.UInt16BE, false)
    }

    //% blockId="sr" block="SR speed %Speed "
    //% Speed.min=0  Speed.max=100
    //% weight=72
    export function sr(Speed: number): void {
        pins.i2cWriteNumber(72, (0x22 * 256) + (Speed), NumberFormat.UInt16BE, false)
        pins.i2cWriteNumber(72, (0x21 * 256) + (256 - Speed), NumberFormat.UInt16BE, false)
    }

    //% blockId="tl" block="TL speed %Speed "
    //% Speed.min=0  Speed.max=100
    //% weight=71
    export function tl(Speed: number): void {
        pins.i2cWriteNumber(72, (0x22 * 256) + (Speed), NumberFormat.UInt16BE, false)
        pins.i2cWriteNumber(72, (0x21 * 256) + (0), NumberFormat.UInt16BE, false)
    }

    //% blockId="tr" block="TR speed %Speed "
    //% Speed.min=0  Speed.max=100
    //% weight=70
    export function tr(Speed: number): void {
        pins.i2cWriteNumber(72, (0x21 * 256) + (Speed), NumberFormat.UInt16BE, false)
        pins.i2cWriteNumber(72, (0x22 * 256) + (0), NumberFormat.UInt16BE, false)
    }

    //% blockId="ao" block="Motor Stop "
    //% weight=69
    export function ao(): void {
        pins.i2cWriteNumber(72, (0x23 * 256) + (0), NumberFormat.UInt16BE, false)
    }

}