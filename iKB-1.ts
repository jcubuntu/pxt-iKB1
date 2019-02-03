/** 
* Enumeration of iKBADC.
*/
enum iKB1ADC {
    //% block="ADC 0"
    ADC0 = 0x80,
    //% block="ADC 1"
    ADC1 = 0x90,
    //% block="ADC 2"
    ADC2 = 0xA0,
    //% block="ADC 3"
    ADC3 = 0xB0,
    //% block="ADC 4"
    ADC4 = 0xC0,
    //% block="ADC 5"
    ADC5 = 0xD0,
    //% block="ADC 6"
    ADC6 = 0xE0,
    //% block="ADC 7"
    ADC7 = 0xF0
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
    SV10 = 0x41,
    //% block="11"
    SV11 = 0X42,
    //% block="12"
    SV12 = 0x44,
    //% block="13"
    SV13 = 0x48,
    //% block="14"
    SV14 = 0x50,
    //% block="15"
    SV15 = 0x60,
    //% block="ALL"
    ALL = 0x7F
}
enum iKB1MotorCH {
    //% block="1"
    M1 = 0x21,

    //% block="2"
    M2 = 0x22,

    //% block="3"
    M3 = 0x24,

    //% block="4"
    M4 = 0x28,

    //% block="1&2"
    M12 = 0x23,

    //% block="ALL"
    ALL = 0x2F,
}

enum iKB1Motor {
    //% block="Forward \u21c8"
    Forward,
    //% block="Backward \u21ca"
    Backward
}

enum iKB1Turn {
    //% block="Left \u27f5"
    Left,
    //% block="Right \u27f6"
    Right
}

/**
  * Enumeration of SpinMotor.
  */
enum iKB1Spin {
    //% block="Left \u21f5"
    Left,
    //% block="Right \u21c5"
    Right
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

    //% blockId="out" block="iKB1 OUT pin %pinx| to %st "
    //% weight=75
    export function out(p: pinx, st: st): void {
        pins.i2cWriteNumber(72, ((8 + p) * 256) + st, NumberFormat.UInt16BE, false)
    }

    //% blockId="sv" block="iKB1 Servo CH %sv | angle %Angle "
    //% Angle.min=-1  Angle.max=200
    //% weight=80
    export function servo(CH: sv, Angle: number): void {
        pins.i2cWriteNumber(72, (CH * 256) + Angle, NumberFormat.UInt16BE, false)
    }

    //% blockId="in" block="iKB1 IN pin %pinx "
    //% weight=50
    export function In(p: pinx): number {
        pins.i2cWriteNumber(72, ((8 + p) * 256) + 2, NumberFormat.UInt16BE, false)
        return pins.i2cReadNumber(72, NumberFormat.UInt8BE, false)
    }
    //% blockId="in_p" block="IKB1 IN PullUp pin %pinx "
    //% weight=50
    export function In_p(p: pinx): number {
        pins.i2cWriteNumber(72, ((8 + p) * 256) + 3, NumberFormat.UInt16BE, false)
        return pins.i2cReadNumber(72, NumberFormat.UInt8BE, false)
    }

    /**ReadADC for read analog sensor, Select ADC channel 0-7. 
         *
         */
    //% blockId="iKBADC" block="iKB1 Read %ADC_CH"
    //% weight=75
    export function ADC(ADC_CH: iKB1ADC): number {
        let ADCValue: number;
        pins.i2cWriteNumber(72, ADC_CH, NumberFormat.UInt8LE, false)
        return pins.i2cReadNumber(72, NumberFormat.UInt16BE, false)
    }

    /**Motor Block to drives motor forward and backward. The speed motor is adjustable between 0 to 100.
      * @param speed percent of maximum speed, eg: 50
      */
    //% blockId="iKB1_Motor" block="iKB1 Motor %iKB1Motor|speed %speed"
    //% speed.min=0 speed.max=100
    //% weight=95
    export function Motor(Motor: iKB1Motor, speed: number): void {
        if (Motor == iKB1Motor.Forward) {
            pins.i2cWriteNumber(72, (0x23 * 256) + speed, NumberFormat.UInt16BE, false)
        }
        else if (Motor == iKB1Motor.Backward) {
            pins.i2cWriteNumber(72, (0x23 * 256) + (256 - speed), NumberFormat.UInt16BE, false)
        }
    }

    //% blockId="IKB_reset" block="iKB Reset"
    //% weight=50
    export function Reset(): void {
        pins.i2cWriteNumber(72, 0, NumberFormat.UInt8BE, false)
    }



    /**MotorCH set Motor Channel and Direction. The speed motor is adjustable between 0 to 100.   
     * @param Speed percent of maximum Speed, eg: 50
     */
    //% blockId="iKB1_MotorCH" block="setMotor %iKB1MotorCH | Direction %iKB1Motor | Speed %Speed"
    //% Speed.min=0 Speed.max=100
    //% weight=100
    export function setMotor(Channel: iKB1MotorCH, Direction: iKB1Motor, Speed: number): void {
        if (Direction == iKB1Motor.Forward) {
            pins.i2cWriteNumber(72, (Channel * 256) + (Speed), NumberFormat.UInt16BE, false)
        }
        else if (Direction == iKB1Motor.Backward) {
            pins.i2cWriteNumber(72, (Channel * 256) + (256 - Speed), NumberFormat.UInt16BE, false)
        }

    }


    /**Spin Block set direction SpinLeft or SpinRight. The speed motor is adjustable between 0 to 100.  
      * @param speed percent of maximum speed, eg: 50
      */
    //% blockId="iKB1_Spin" block="iKB1 Spin %iKB1Spin|speed %speed"
    //% speed.min=0 speed.max=100
    //% weight=85
    export function Spin(Spin: iKB1Spin, speed: number): void {
        if (Spin == iKB1Spin.Left) {
            pins.i2cWriteNumber(72, (0x21 * 256) + (speed), NumberFormat.UInt16BE, false)
            pins.i2cWriteNumber(72, (0x22 * 256) + (256 - speed), NumberFormat.UInt16BE, false)
        }
        else if (Spin == iKB1Spin.Right) {
            pins.i2cWriteNumber(72, (0x22 * 256) + (speed), NumberFormat.UInt16BE, false)
            pins.i2cWriteNumber(72, (0x21 * 256) + (256 - speed), NumberFormat.UInt16BE, false)
        }
    }

    /**Turn Block set direction TurnLeft or TurnRight. The speed motor is adjustable between 0 to 100.
      * @param speed percent of maximum speed, eg: 50
      */
    //% blockId="iKB1_Turn" block="iKB1 Turn %iKB1Turn|speed %speed"
    //% speed.min=0 speed.max=100
    //% weight=90
    export function Turn(Turn: iKB1Turn, speed: number): void {
        if (Turn == iKB1Turn.Left) {
            pins.i2cWriteNumber(72, (0x22 * 256) + (speed), NumberFormat.UInt16BE, false)
            pins.i2cWriteNumber(72, (0x21 * 256) + (0), NumberFormat.UInt16BE, false)
        }
        else if (Turn == iKB1Turn.Right) {
            pins.i2cWriteNumber(72, (0x21 * 256) + (speed), NumberFormat.UInt16BE, false)
            pins.i2cWriteNumber(72, (0x22 * 256) + (0), NumberFormat.UInt16BE, false)
        }
    }

    //% blockId="AO" block="Motor Stop"
    //% weight=85
    export function AO(): void {
        pins.i2cWriteNumber(72, (0x23 * 256) + (0), NumberFormat.UInt16BE, false)
    }

}