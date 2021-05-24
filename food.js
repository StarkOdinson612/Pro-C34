class Food {
    constructor() {
        this.foodStock;
        this.lastFed;
        this.image = loadImage("images/milk.png")
    }

    getFoodStock() {
        
    }

    updateFoodStock() {

    }

    deductFood() {

    }

    display() {
        let x = 200, y = 700;

        imageMode(CENTER)
        image(this.image,300, 450, 150, 150);

        if (this.foodStock != 0) {
            for (var i = 0; i < this.foodStock;i++) {
                if (i % 10 == 0) {
                    x = 200;
                    y += 100;
                }
                image(this.image, x, y, 100, 100)
                x += 60
            }
        }
    }
}