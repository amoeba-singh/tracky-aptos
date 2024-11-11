module user_points_v3::user_points_v3 {
    use std::vector;
    use std::signer;
    
    struct UserInfo has key {
        mongodb_id: vector<u8>,
        points: u64
    }

    public entry fun initialize_user(
        account: &signer,
        mongodb_id: vector<u8>
    ) {
        let user_addr = signer::address_of(account);
        assert!(!exists<UserInfo>(user_addr), 1);
        
        move_to(account, UserInfo {
            mongodb_id,
            points: 0
        });
    }

    public entry fun increase_points(account: &signer, amount: u64) acquires UserInfo {
        let user_addr = signer::address_of(account);
        let user_info = borrow_global_mut<UserInfo>(user_addr);
        user_info.points = user_info.points + amount;
    }

    public entry fun decrease_points(account: &signer, amount: u64) acquires UserInfo {
        let user_addr = signer::address_of(account);
        let user_info = borrow_global_mut<UserInfo>(user_addr);
        assert!(user_info.points >= amount, 1);
        user_info.points = user_info.points - amount;
    }

    #[view]
    public fun get_user_info(addr: address): (vector<u8>, u64) acquires UserInfo {
        let user_info = borrow_global<UserInfo>(addr);
        (user_info.mongodb_id, user_info.points)
    }
}