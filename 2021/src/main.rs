use std::env;
use std::process;
use std::fs;
#[path = "solutions/solution15.rs"] mod solution_1;

fn main() {
    let args: Vec<String> = env::args().collect();

    if args.len() < 3 {
        println!("Invalid use");
        println!("Usage: cargo run [input file] [puzzle part 1 or 2]");
        process::exit(1)
    }
    let input = get_input(&args[1]);

    if args[2] == "1" {
        let count = solution_1::part1(&input);
        println!("Answer is {}", count);
    } else if args[2] == "2" {
        // let count = solution_1::part2(&input);
        // println!("Answer is {}", count);
    } else {
        println!("Invalid puzzle part");
        process::exit(1)
    }
}

fn get_input(path: &str) -> String {
    let contents = fs::read_to_string(path)
      .expect("Something went wrong");

    return contents;
}
