module MyModule::TaskReward {

    use aptos_framework::signer;
    use aptos_framework::event;
    use std::vector;

    // Structure to store user's task completion data
    struct UserTasks has store, key {
        owner: address,        // User's address
        already_participated: bool,  // Flag to check if the engaged in other challenge
    }

    // Structure to store reward token balance for each user
    struct RewardToken has store, key {
        balance: u64,  // Reward balance of the user
    }

    // Function to mint reward tokens (called when all tasks are completed)
    public fun mint_reward_token(owner: &signer, amount: u64) acquires RewardToken {
        let owner_address = signer::address_of(owner);
        let reward_token = borrow_global_mut<RewardToken>(owner_address); // Borrow the user's reward token balance
        reward_token.balance = reward_token.balance + amount; // Add the minted tokens
    }

    // Function to create a new user tasks entry (initially 0 tasks completed)
    public fun create_user(owner: &signer) acquires UserTasks {
        let owner_address = signer::address_of(owner);
        let user_tasks = borrow_global_mut<UserTasks>(owner_address);

        // assert!(user_tasks.already_participated == false, 1);
        

        let user_tasks = UserTasks {
            owner: owner_address,
            already_participated: true,
        };
        move_to(owner, user_tasks); // Move the user tasks record to the user's account

        // Create the user's reward token entry with 0 balance
        let reward_token = RewardToken {
            balance: 0,
        };
        move_to(owner, reward_token); // Move the reward token record to the user's account
    }


    // Function to reset the user's tasks and reward status (can be used for a new challenge)
    // public fun reset_user(owner: &signer) acquires UserTasks {
    //     let owner_address = signer::address_of(owner);
    //     let user_tasks = borrow_global_mut<UserTasks>(owner_address); // Borrow the user's task record
    //     user_tasks.already_participated = false; // Reset reward flag
    // }
}