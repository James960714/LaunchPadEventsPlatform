const userData = [
  {
      "firstName": "Alice",
      "lastName": "Johnson",
      "dob": "1985-06-15",
      "address": {
          "houseNo": 101,
          "street": "Queen Street",
          "townCity": "London",
          "postCode": "E1 7AA"
      },
      "eventsAttending": ['674d971e5c0a94b4de6377ab', '674d971e5c0a94b4de6377ac', '674d971e5c0a94b4de6377aa'],
      "userType": "Customer"
  },
  {
      "firstName": "Jack",
      "lastName": "Taylor",
      "dob": "1990-03-22",
      "address": {
          "houseNo": 22,
          "street": "Baker Street",
          "townCity": "Manchester",
          "postCode": "M4 5TT"
      },
      "eventsAttending": ['674d971e5c0a94b4de6377ab', '674d971e5c0a94b4de6377ac', '674d971e5c0a94b4de6377aa'],
      "userType": "Customer"
  },
  {
      "firstName": "Emma",
      "lastName": "Wilson",
      "dob": "2001-12-05",
      "address": {
          "houseNo": 45,
          "street": "Church Road",
          "townCity": "Birmingham",
          "postCode": "B3 3SD"
      },
      "eventsAttending": ['674d971e5c0a94b4de6377ab', '674d971e5c0a94b4de6377ac', '674d971e5c0a94b4de6377aa'],
      "userType": "Customer"
  },
  {
      "firstName": "Liam",
      "lastName": "Smith",
      "dob": "1973-09-10",
      "address": {
          "houseNo": 67,
          "street": "High Street",
          "townCity": "Glasgow",
          "postCode": "G2 7BG"
      },
      "eventsAttending": [],
      "userType": "Staff"
  },
  {
      "firstName": "Sophia",
      "lastName": "Brown",
      "dob": "1965-04-14",
      "address": {
          "houseNo": 88,
          "street": "Station Lane",
          "townCity": "Leeds",
          "postCode": "LS2 9JT"
      },
      "eventsAttending": ['674d971e5c0a94b4de6377ab', '674d971e5c0a94b4de6377ac', '674d971e5c0a94b4de6377aa'],
      "userType": "Customer"
  },
  {
      "firstName": "Noah",
      "lastName": "White",
      "dob": "1980-11-20",
      "address": {
          "houseNo": 59,
          "street": "Market Street",
          "townCity": "Cardiff",
          "postCode": "CF1 2AB"
      },
      "eventsAttending": ['674d971e5c0a94b4de6377ab', '674d971e5c0a94b4de6377ac', '674d971e5c0a94b4de6377aa'],
      "userType": "Customer"
  },
  {
      "firstName": "Olivia",
      "lastName": "Harris",
      "dob": "1995-02-13",
      "address": {
          "houseNo": 34,
          "street": "Oxford Road",
          "townCity": "Edinburgh",
          "postCode": "EH3 6BP"
      },
      "eventsAttending": ['674d971e5c0a94b4de6377ab', '674d971e5c0a94b4de6377ac', '674d971e5c0a94b4de6377aa'],
      "userType": "Customer"
  },
  {
      "firstName": "James",
      "lastName": "Scott",
      "dob": "1978-07-30",
      "address": {
          "houseNo": 12,
          "street": "King Street",
          "townCity": "Liverpool",
          "postCode": "L1 2AB"
      },
      "eventsAttending": [],
      "userType": "Staff"
  },
  {
      "firstName": "Charlotte",
      "lastName": "Green",
      "dob": "1987-10-08",
      "address": {
          "houseNo": 99,
          "street": "Prince's Street",
          "townCity": "Newcastle",
          "postCode": "NE1 4AW"
      },
      "eventsAttending": ['674d971e5c0a94b4de6377ab', '674d971e5c0a94b4de6377ac', '674d971e5c0a94b4de6377aa'],
      "userType": "Customer"
  },
  {
      "firstName": "Benjamin",
      "lastName": "Martin",
      "dob": "1968-01-25",
      "address": {
          "houseNo": 77,
          "street": "Castle Lane",
          "townCity": "Oxford",
          "postCode": "OX1 1RF"
      },
      "eventsAttending": [],
      "userType": "Staff"
  },
  {
      "firstName": "Amelia",
      "lastName": "Davis",
      "dob": "1998-09-15",
      "address": {
          "houseNo": 200,
          "street": "Elm Street",
          "townCity": "Brighton",
          "postCode": "BN2 1AA"
      },
      "eventsAttending": ['674d971e5c0a94b4de6377ad', '674d971e5c0a94b4de6377ae'],
      "userType": "Customer"
  },
  {
      "firstName": "Ethan",
      "lastName": "Clark",
      "dob": "1970-11-08",
      "address": {
          "houseNo": 14,
          "street": "Maple Avenue",
          "townCity": "Cambridge",
          "postCode": "CB1 1AA"
      },
      "eventsAttending": [],
      "userType": "Staff"
  },
  {
      "firstName": "Mia",
      "lastName": "Turner",
      "dob": "1992-04-25",
      "address": {
          "houseNo": 75,
          "street": "Willow Road",
          "townCity": "Bristol",
          "postCode": "BS1 3DD"
      },
      "eventsAttending": ['674d971e5c0a94b4de6377af'],
      "userType": "Customer"
  },
  {
      "firstName": "Henry",
      "lastName": "Parker",
      "dob": "1982-12-12",
      "address": {
          "houseNo": 31,
          "street": "Oak Drive",
          "townCity": "Sheffield",
          "postCode": "S1 1DJ"
      },
      "eventsAttending": ['674d971e5c0a94b4de6377ae'],
      "userType": "Customer"
  },
  {
      "firstName": "Ella",
      "lastName": "Hall",
      "dob": "2005-07-19",
      "address": {
          "houseNo": 8,
          "street": "Aspen Street",
          "townCity": "Bath",
          "postCode": "BA1 2AB"
      },
      "eventsAttending": ['674d971e5c0a94b4de6377af', '674d971e5c0a94b4de6377ad'],
      "userType": "Customer"
  },
  {
      "firstName": "George",
      "lastName": "Moore",
      "dob": "1996-06-20",
      "address": {
          "houseNo": 19,
          "street": "Birch Lane",
          "townCity": "Plymouth",
          "postCode": "PL1 1DA"
      },
      "eventsAttending": ['674d971e5c0a94b4de6377ae'],
      "userType": "Customer"
  },
  {
      "firstName": "Grace",
      "lastName": "Wright",
      "dob": "1990-10-01",
      "address": {
          "houseNo": 101,
          "street": "Holly Street",
          "townCity": "York",
          "postCode": "YO1 7RD"
        },
        "eventsAttending": [],
        "userType": "Staff"
    },
    {
        "firstName": "Lily",
        "lastName": "King",
        "dob": "1989-03-11",
        "address": {
            "houseNo": 42,
            "street": "Cedar Avenue",
            "townCity": "Norwich",
            "postCode": "NR1 4AA"
        },
        "eventsAttending": ['674d971e5c0a94b4de6377af'],
        "userType": "Customer"
    },
    {
        "firstName": "Leo",
        "lastName": "Baker",
        "dob": "1975-05-07",
        "address": {
            "houseNo": 56,
            "street": "Spruce Street",
            "townCity": "Exeter",
            "postCode": "EX4 3AA"
        },
        "eventsAttending": [],
        "userType": "Staff"
    }
  ]
  module.exports = userData