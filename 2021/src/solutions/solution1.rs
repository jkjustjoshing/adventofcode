pub fn part1(input: &str) -> i32 {
  let split = input.split("\n");
  let mut count = 0;
  let mut prev_val: i32 = -1;
  for s in split {
      if s.len() == 0 {
          continue;
      }

      let num = s.parse::<i32>().unwrap();

      if prev_val == -1 {
          prev_val = num;
          continue;
      }
      if prev_val < num {
          count = count + 1;
      }
      prev_val = num;
  }

  return count;
}

// pub fn part2(input: &str) -> i32 {
//   let split = input.split("\n");
//   let mut count = 0;
//   let mut prev_one: i32 = -1;
//   let mut prev_two: i32 = -1;
//   let mut prev_sum: i32 = -1;
//   for s in split {
//       if s.len() == 0 {
//           continue;
//       }

//       let num = s.parse::<i32>().unwrap();

//       if prev_one == -1 || prev_two == -1 {
//           prev_two = prev_one;
//           prev_one = num;
//           continue;
//       }

//       let sum = prev_two + prev_one + num;
//       if prev_sum == -1 {
//         prev_sum = sum;
//         continue;
//       }

//       if prev_sum < sum {
//           count = count + 1;
//       }
//       prev_sum = num;
//   }

//   return count;
// }
