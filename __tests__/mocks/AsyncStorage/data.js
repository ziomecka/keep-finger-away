export default {
  set1: {
    'data': {
      today: [],
      yeasterday: [],
      week: [],
    },
    'rawData': [
      {
        result: 1,
        date: Date.now()
      },
      {
        result: 1,
        date: Date.now()
      }
      
    ],
    'stats': {
      today: {
        played: 100,
        won: 0.96,
        averageResult: 2
        
      },
      yeasterday: {
        played: 10,
        won: 0.92,
        averageResult: 2
      },
      week: {
        played: 50,
        won: 0.94,
        averageResult: 2
      }
    }
  }
}