# radius = float(input("Enter the radius of the circle: "))

# pi = 3.14159
# area = pi * radius * radius

# print("Area of the circle is:", area)


year = int(input("Enter a year: "))

if (year % 400 == 0) or (year % 4 == 0 and year % 100 != 0):
    print(year, "is a leap year")
else:
    print(year, "is not a leap year")
