export const mockResultString = "Mock Result"

export const postCodeApiErrorMsg = "Location Error - Location is invalid. Remember only UK locations will return results.";

export const crimeApiError = "Crime API Error - Try an earlier month.";

export const mockFilterState = {
  "ccc Mock Category 1": {state: false},
  "bbb Mock Category 2": {state: true},
  "aaa Mock Category 3": {state: true},
}

export const mockFilteredResults =    [
  {
    category: 'bbb Mock Category 2',
    location: { street:{name: "ccc Mock Street 2" }},
    outcome_status: { category: 'bbb Mock Outcome 2' }
  },
  {
    category: 'aaa Mock Category 3',
    location: { street: {name: "bbb Mock Street 3"} },
    outcome_status: { category: 'aaa Mock Outcome 3' }
  }
]

export const mockedDOM = `<div class="filter-container">
                          <input checked="true">
                          <input checked="true">
                          <input checked="true">
                          </div>
                          <div id="post-code">London</div>
                          <div id="year-select">2018</div>
                          <div id="month-select">1</div>`

export const mockResults = [
  {
    category: "ccc Mock Category 1",
    location: {
      street: {
        name: "aaa Mock Street 1"
      }
    },
    "outcome_status": {
      category: "ccc Mock Outcome 1"
    },
  },
  {
    category: "bbb Mock Category 2",
    location: {
      street: {
        name: "ccc Mock Street 2"
      }
    },
    "outcome_status": {
      category: "bbb Mock Outcome 2"
    },
  },
  {
    category: "aaa Mock Category 3",
    location: {
      street: {
        name: "bbb Mock Street 3"
      }
    },
    "outcome_status": {
      category: "aaa Mock Outcome 3"
    },
  },
]


export const mockFilterCategories = {
  'aaa Mock Category 3': { state: false, count: 1 },
  'bbb Mock Category 2': { state: false, count: 1 },
  'ccc Mock Category 1': { state: false, count: 1 }
}

export const mockLocationSortedArray = [
  {
    category: "ccc Mock Category 1",
    location: {
      street: {
        name: "aaa Mock Street 1"
      }
    },
    "outcome_status": {
      category: "ccc Mock Outcome 1"
    },
  },
  {
    category: "aaa Mock Category 3",
    location: {
      street: {
        name: "bbb Mock Street 3"
      }
    },
    "outcome_status": {
      category: "aaa Mock Outcome 3"
    },
  },
  {
    category: "bbb Mock Category 2",
    location: {
      street: {
        name: "ccc Mock Street 2"
      }
    },
    "outcome_status": {
      category: "bbb Mock Outcome 2"
    },
  },
]

export const mockOutcomeSortedArray = [
  {
    category: "aaa Mock Category 3",
    location: {
      street: {
        name: "bbb Mock Street 3"
      }
    },
    "outcome_status": {
      category: "aaa Mock Outcome 3"
    },
  },
  {
    category: "bbb Mock Category 2",
    location: {
      street: {
        name: "ccc Mock Street 2"
      }
    },
    "outcome_status": {
      category: "bbb Mock Outcome 2"
    },
  },
  {
    category: "ccc Mock Category 1",
    location: {
      street: {
        name: "aaa Mock Street 1"
      }
    },
    "outcome_status": {
      category: "ccc Mock Outcome 1"
    },
  },
]