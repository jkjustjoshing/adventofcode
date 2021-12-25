use std::env;
use std::process;
use std::fs;

fn main() {
    let args: Vec<String> = env::args().collect();

    if args.len() < 2 {
        process::exit(1)
    }
    let input = get_input(&args[1]);

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
        prev_val = num
    }
    println!("Answer is {}", count);
}

fn get_input(path: &str) -> String {
    let contents = fs::read_to_string(path)
      .expect("Something went wrong");

    return contents;
}
