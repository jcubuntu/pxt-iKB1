# iKB-1 block package for iKB-1 Baord

powered by micro:bit

![iKB-1](https://raw.githubusercontent.com/jcubuntu/pxt-iKB1/master/icon.png)

The package adds support for the [iKB-1](https://inex.co.th/shop/ikb-1-board.html) conroller board from Innovative Experiment [INEX](https://inex.co.th).

# !Caution do not use iKB-1 with i-BIT baord the I2C Address is same ADC IC on i-BIT board  (0x48)

### micro:bit Pin Assignment

The following micro:bit pins are used for communication to iKB-1 to use analog and digital sensors, DC motor drivers and servo motors:
* ``GND`` -- GND connected to iKB-1 GND
* ``3V `` -- 3V  connected to iKB-1 +3.3
* ``P19`` -- SCL connected to iKB-1 SCL
* ``P20`` -- SDA connected to iKB-1 SDA

### Motor control Block

Use iKB1's motor block to drives motor forward and backward. The speed motor is adjustable between 0 to 100.

* The dirrection must be select either `Forward` or `Backward`
* Speed is an integer value between `0 - 100`


```blocks
iKB1.Motor(iKB1Motor.Forward, 100)

iKB1.Motor(iKB1Motor.Backward, 100)
```

### Spin Block

Spin block is used to control both motors separately. For example, choose one motor spin with forward direction another one spin with backward direction.

* The Spin select direction must be either `Left` or `Right`
* Speed is an integer value between `0 - 100`

```blocks
iKB1.Spin(iKB1Spin.Left, 100)

iKB1.Spin(iKB1Spin.Right, 100)
```

### Turn Block

The Turn block is used to to control the robot movment by turning. The one motor will stop, another one is moving. The vipot point is a center of the robot body.

* The Turn select direction must be either `Left` or `Right`
* Speed is an integer value between `0 - 100`

```blocks
iKB1.Turn(iKB1Turn.Left, 100)

iKB1.Turn(iKB1Turn.Right, 100)
```

### Motor Stop Block 

The Motor Stop block is used to stop both motors. The speed is set to `0` automatic.

```blocks
iKB1.AO()
```

### Servo Block

Use this block for control the servo port 10-15 on iKB-1 board moving degree from -1 to 200

* Degree is an integer value between `(-1) - 200`

```blocks
ikb-1-board.html.Servo(sv.SV10, 90)
```

### ADC Block

This block is used to read the analog input data from the iKB-1 board. The resolution of conversion is 10-bit. Data will be 0 to 1023. iBIT have 8-ch analog inputs. The pinout voltage range is 0 to +5V

* Analog sensor port are `ADC0 - ADC7`
* Select analog channel from `ADC0 - ADC7` for reading the analog sensor.
* Get the analog value to set the conditions for the robot's mission.

### Example

* Read the analog input 0 and display the conversion data on micro:bit. User can change the analog channel any time.

```blocks
basic.showNumber(iKB1.ADC(iKB1ADC.ADC0))
```

* Drive the motors with Forward and Backward by counting speed `0 - 100`

```blocks
let speed = 0
basic.forever(() => {
    for (let speed = 0; speed <= 100; speed++) {
        iKB1.Motor(iKB1Motor.Forward, speed)
        basic.pause(50)
    }
    for (let speed = 0; speed <= 100; speed++) {
        iKB1.Motor(iKB1Motor.Backward, speed)
        basic.pause(50)
    }
})
```

* Drive the motors by pressing button `A` and `B`. Turn Left by speed 50 when pressed button `A` and Turn Right by speed 50 when pressed button `B`.

```blocks
input.onButtonPressed(Button.A, () => {
    iKB1.Turn(iKB1Turn.Left, 50)
})
input.onButtonPressed(Button.B, () => {
    iKB1.Turn(iKB1Turn.Right, 50)
})
```

* Spin the motors by pressing button `A` and `B`. Spin Left by speed 50 when pressed button `A` and Spin Right by speed 50 when pressed button `B`.

```blocks
input.onButtonPressed(Button.A, () => {
    iKB1.Spin(iKB1Spin.Left, 50)
})
input.onButtonPressed(Button.B, () => {
    iKB1.Spin(iKB1Spin.Right, 50)
})
```

* Example for Servo, drive the servo motor's movement angle at Servo output 10 and 11 from `0 - 180` and back to 0 to restart again. 

```blocks
basic.forever(() => {
    for (let Degree = 0; Degree <= 180; Degree++) {
        iKB1.Servo(sv.SV10, Degree)
        iiKB1.Servo(sv.SV11, Degree)
        basic.pause(10)
        while (Degree == 180) {
            Degree = 0
        }
    }
})
```

* Example for set Servo Stop or set freedom servo.

```blocks
input.onButtonPressed(Button.A, () => {
    iKB1.Servo(sv.SV10, 90)
})
input.onButtonPressed(Button.B, () => {
    iKB1.Servo(sv.SV10,-1)
})
```



## License

MIT

## Supported targets

* for PXT/microbit
