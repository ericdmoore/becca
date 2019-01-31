import { Attendance } from '../src/comps/classViews/attendance.comp.js'

export default {
  'sum can add': {
    FakeTest1: [Attendance(0, 0), 0],
    // 'positive numbers': [Attendance(1, 2), 3],
    // 'negative numbers': [Attendance(-1, -2), -3],
    // 'mixed sign numbers': [Attendance(1, -2), -1],
    'FakeTest2': [Attendance(2, 2), 4]
  }
}
