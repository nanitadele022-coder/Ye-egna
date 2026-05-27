/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'en' | 'am';

export const TRANSLATIONS = {
  en: {
    // common
    brand: "YeEgna",
    love_motto: "Our Money, Our Love",
    currency: "Birr",
    currency_short: "ETB",
    my_partner: "My Partner",
    husband: "Husband 👔",
    wife: "Wife 👗",
    our_money: "Our Money",
    my_money: "My Money",
    everyone: "Everyone",
    all_flows: "All Flows",
    all_spaces: "All Spaces",
    shared: "Shared",
    personal: "Personal",
    money_in: "Money In 💰",
    money_out: "Money Out 💸",
    budget_spaces: "OUR MONEY SPACES",
    saving_growth: "Savings Growth",
    growth_surplus: "Our Growth Surplus",
    teamwork_score: "Teamwork Score",
    peak_out: "Peak Flow Out",
    advice_title: "YeEgna AI Smart Advice",
    advice_footer: "“Habesha unity yields perfect treasures. Keep rising on your stairs, step by step! 🇪🇹”",
    
    // categories
    cat_food: "Food 🍔",
    cat_transport: "Transport 🚗",
    cat_shopping: "Shopping 🛍️",
    cat_rent: "Rent 🏡",
    cat_internet: "Internet 🌐",
    cat_entertainment: "Entertainment 🎬",
    cat_gifts: "Gifts 🎁",
    cat_bills: "Bills 📄",
    cat_healthcare: "Healthcare 🏥",
    cat_emergency: "Emergency 🛡️",
    cat_other: "Other ✨",

    // tabs
    tab_home: "Home",
    tab_activity: "Activity",
    tab_goals: "Goals",
    tab_summary: "Summary",
    tab_updates: "Updates",
    tab_settings: "Settings",

    // Auth page
    auth_welcome_title: "Pair & Settle Together",
    auth_welcome_subtitle: "The ultimate cozy finance and growth staircase for modern Habesha lovers.",
    auth_switch_to_register: "New couple joining? Create dynamic room",
    auth_switch_to_login: "Already joined? Proceed to sync credentials",
    auth_email_label: "EMAIL ADDRESS",
    auth_password_label: "ROOM SECURITY LOCK CODE",
    auth_name_label: "AMHARIC NICKNAME",
    auth_partner_name_label: "PARTNER NICKNAME (OPTIONAL)",
    auth_pairing_label: "UNION LOCK CODE (E.g. AMHARIC)",
    auth_login_btn: "Synchronize Credentials 🔑",
    auth_register_btn: "Launch Cozy Shared Future 💍",
    auth_offline_alert: "Offline Mode active! Click the toggle to simulate on your browser storage.",
    auth_offline_btn: "Play Offline Sandbox Immediately 🪄",

    // Dashboard
    dash_hello: "Selam, {name}! 🌸",
    dash_climb_banner: "We Climb Together",
    dash_staircase_title: "Step by Step Staircase",
    dash_staircase_subtitle: "“Holding hands, managing our finance together, building our future in Ethiopia.”",
    dash_hide_bal: "Hide",
    dash_show_bal: "Show",
    dash_lydia_space: "Lydia's Space 👗",
    dash_dawit_space: "Dawit's Space 👔",
    dash_sweet_reminder: "SWEET REMINDER",
    dash_recent_activity: "RECENT MONEY ACTIVITY",
    dash_see_all: "See All",
    dash_add_first_activity: "Add your first money step! 💖",
    dash_quick_action: "Quick Financial Actions",

    // Activities page
    act_header_mono: "The Ledger",
    act_header_title: "Money Activity Log",
    act_add_steps: "Add Steps 💖",
    act_search_placeholder: "Search notes or categories...",
    act_filter_panel: "Advanced Filter Panel",
    act_filter_flow: "Flow",
    act_filter_space: "Space",
    act_filter_partner: "By Partner",
    act_no_activities: "No activities found",
    act_no_activities_sub: "Try resetting filters or registering a new Money Activity step.",
    act_delete_title: "Delete step",

    // Dream goals page
    goal_header_mono: "Our Future",
    goal_header_title: "Dream Goals",
    goal_start_btn: "Start Dream Goal",
    goal_modal_title: "Start a Dream Goal",
    goal_name_label: "DREAM NAME",
    goal_name_placeholder: "E.g., Emergency Fund, Baby Fund, Car Plan",
    goal_target_label: "TARGET BIRR AMOUNT",
    goal_category_label: "CATEGORY",
    goal_deadline_label: "TARGET DATE",
    goal_start_submit: "Start Dream Goal 🪄",
    goal_add_savings_title: "Add Money to Dream",
    goal_add_savings_sub: "Move cash from your budget or direct income into this sacred dream container!",
    goal_add_savings_amount: "HOW MUCH BIRR TO TRANSFER?",
    goal_add_savings_submit: "Save Money Inside 💖",
    goal_total_title: "Total Dream Power",
    goal_total_saved: "saved",
    goal_total_across: "Across {num} dream targets",
    goal_no_goals: "No dreams defined yet!",
    goal_no_goals_sub: "Whether it is a custom baby fund, buying a house/car, or building an safety net, start climbing today!",
    goal_no_goals_btn: "Start Your First Goal!",
    goal_saved_percent: "{percent}% Saved",
    goal_future_quote: "Our Sweet Future Nest",
    goal_celebration_title: "DREAM TARGET MET!",
    goal_celebration_sub: "Goal Accomplished! 🎉",
    goal_celebration_desc: "You both worked in harmony to save a legendary {amount} Birr together.",
    goal_celebration_quote: "“Every step together climber reinforces our love. On to the next dream on our staircase!”",
    goal_celebration_btn: "Hooray! Continuously Rise 🚀",

    // Monthly summary page
    sum_header_mono: "The Reports",
    sum_header_title: "Monthly Summary",
    sum_shared_steps: "Our Shared Steps This Month",
    sum_spent_chart_title: "Where Our Money Went",
    sum_spent_chart_right: "BIRR SPENT",
    sum_spent_no_chart: "Add Money Out activities to view your beautiful visual category charts here! 📊",
    sum_ai_banner: "YeEgna AI Smart Advice",
    sum_ai_footer: "“Habesha unity yields perfect treasures. Keep rising on your stairs, step by step! 🇪🇹”",
    
    // Updates page
    updates_mono: "The Inbox",
    updates_title: "Updates",
    updates_clear_all: "Clear All",
    updates_empty_title: "Everything is peaceful",
    updates_empty_desc: "When there are updates on your spending limits, dream goals, or partner financial entries, they will appear here!",

    // Settings page
    sett_mono: "Our Account",
    sett_title: "Settings & Profile",
    sett_profile_details: "Profile Details",
    sett_edit_name: "EDIT NAME",
    sett_sync_code: "COUPLE PAIRING CODE (Sync code)",
    sett_sync_desc: "💡 Link both of your phones by saving the identical matching code (e.g. AMHARIC).",
    sett_adjust_btn: "Adjust Profile & Pair 💖",
    sett_team_agreement: "Our Teamwork Agreement",
    sett_team_li1: "We agree to honestly record all Money Out, avoiding hidden transactions.",
    sett_team_li2: "We align on our Dream Goals and support each other's climbing progress.",
    sett_team_li3: "We do not blame; we coordinate and rise, step by step.",
    sett_sys_controls: "System Controls",
    sett_clear_db: "Clear Local Database",
    sett_clear_db_desc: "Reset all saved steps to default initial sandbox data.",
    sett_logout: "Secure Logout",
    sett_logout_desc: "Safely log out of your session on this phone.",
    sett_logout_btn: "Logout",
    sett_language_sec: "Language Preferences",
    sett_language_desc: "Switch between English and Amharic languages instantly.",

    // Add activity modal
    modal_header: "New Money Activity",
    modal_sub: "Add some love to your joint financial steps",
    modal_act_type: "ACTIVITY TYPE",
    modal_birr_amount: "BIRR AMOUNT",
    modal_scope_label: "WHICH MONEY SPACE?",
    modal_attribute_label: "WHO TO ATTRIBUTE?",
    modal_note_label: "LOVE NOTE / DESCRIPTION",
    modal_note_placeholder: "E.g., Bought roses for her 🌹, Shahi tea for us ☕",
    modal_submit_out: "Add Money Out",
    modal_submit_in: "Add Money In",
  },
  am: {
    // common
    brand: "የኛ",
    love_motto: "ገንዘባችን፣ ፍቅራችን",
    currency: "ብር",
    currency_short: "ETB",
    my_partner: "የኔ ውድ",
    husband: "ባል 👔",
    wife: "ሚስት 👗",
    our_money: "የጋራ ገንዘባችን",
    my_money: "የኔ የግል ገንዘብ",
    everyone: "ሁሉም ሰው",
    all_flows: "ሁሉንም እንቅስቃሴዎች",
    all_spaces: "ሁሉንም ቦታዎች",
    shared: "የጋራ",
    personal: "የግል",
    money_in: "ገቢ 💰",
    money_out: "ወጪ 💸",
    budget_spaces: "የገንዘብ ቦታዎቻችን",
    saving_growth: "ቁጠባ እድገት",
    growth_surplus: "የእድገት ትርፋችን",
    teamwork_score: "የቡድን ጥምረት ውጤት",
    peak_out: "ከፍተኛው ወጪ",
    advice_title: "የየኛ ስማርት የገንዘብ ምክሮች",
    advice_footer: "“የሀበሻ አንድነት ፍጹም በረከትን ይሰጣል። በደረጃችን ላይ ደረጃ በደረጃ እጅ ለእጅ ተያይዘን እንውጣ! 🇪🇹”",

    // categories
    cat_food: "ምግብ 🍔",
    cat_transport: "ትራንስፖርት 🚗",
    cat_shopping: "ግብይት (ሾፒንግ) 🛍️",
    cat_rent: "ቤት ኪራይ 🏡",
    cat_internet: "ኢንተርኔት 🌐",
    cat_entertainment: "መዝናኛ 🎬",
    cat_gifts: "ስጦታዎች 🎁",
    cat_bills: "ክፍያዎች 📄",
    cat_healthcare: "ህክምና 🏥",
    cat_emergency: "አስቸኳይ ሁኔታ 🛡️",
    cat_other: "ሌሎች ✨",

    // tabs
    tab_home: "መነሻ",
    tab_activity: "እንቅስቃሴ",
    tab_goals: "ግብ",
    tab_summary: "ማጠቃለያ",
    tab_updates: "መልዕክቶች",
    tab_settings: "ቅንብሮች",

    // Auth page
    auth_welcome_title: "እጅ ለእጅ ተያይዘን አብረን እንልማ",
    auth_welcome_subtitle: "ለፈጣን ዕድገት ለሚመኙ ውድ ኢትዮጵያውያን ባለትዳሮች የተዘጋጀ ምቹ የገንዘብ አያያዝ እና አስተዳደር ደረጃ።",
    auth_switch_to_register: "አዲስ ተጋቢዎች? አዲስ የጋራ አካውንት እዚህ ይክፈቱ",
    auth_switch_to_login: "ቀድሞውኑ ተመዝግበዋል? መግቢያውን እዚህ ያግኙ",
    auth_email_label: "የኢሜይል አድራሻ",
    auth_password_label: "የክፍል ደህንነት መቆለፊያ ኮድ",
    auth_name_label: "የኔ ውድ ስም (ቅጽል ስም)",
    auth_partner_name_label: "የባልደረባ ቅጽል ስም (ከተፈለገ)",
    auth_pairing_label: "የማጣመሪያ ጥንድ ኮድ (ለምሳሌ፦ AMHARIC)",
    auth_login_btn: "ሁሉንም ነገር አመሳስል 🔑",
    auth_register_btn: "የወደፊት ህይወታችንን እዚህ እንጀምር 💍",
    auth_offline_alert: "ያለ ኢንተርኔት መጫወቻ ሁነታ ገቢር ነው! በአሳሽዎ ማከማቻ ላይ ለመጫወት መቀያየሪያውን ይጫኑ።",
    auth_offline_btn: "ያለ ኢንተርኔት በስልኬ ብቻ ልሞክረው 🪄",

    // Dashboard
    dash_hello: "ሰላም፣ {name}! 🌸",
    dash_climb_banner: "አብረን ወደላይ እንወጣለን",
    dash_staircase_title: "ደረጃ በደረጃ የዕድገት መሰላል",
    dash_staircase_subtitle: "“እጅ ለእጅ ተያይዘን፣ ገንዘባችንን አብረን እያስተዳደርን፣ የወደፊት ህይወታችንን በኢትዮጵያ እንገነባለን።”",
    dash_hide_bal: "ደብቅ",
    dash_show_bal: "አሳይ",
    dash_lydia_space: "የሊዲያ ቦታ 👗",
    dash_dawit_space: "የዳዊት ቦታ 👔",
    dash_sweet_reminder: "ጣፋጭ ማስታወሻ 💖",
    dash_recent_activity: "የቅርብ ጊዜ የገንዘብ እንቅስቃሴዎች",
    dash_see_all: "ሁሉንም አሳይ",
    dash_add_first_activity: "የመጀመሪያውን የጋራ እንቅስቃሴ እዚህ ይመዝግቡ! 💖",
    dash_quick_action: "ፈጣን የገንዘብ ድርጊቶች",

    // Activities page
    act_header_mono: "የሂሳብ ደብተር",
    act_header_title: "የገንዘብ እንቅስቃሴ መዝገብ",
    act_add_steps: "አዲስ እንቅስቃሴ 💖",
    act_search_placeholder: "ማስታወሻ ወይም ምድቦችን ፈልግ...",
    act_filter_panel: "የበለጠ ዝርዝር ማጣሪያዎች",
    act_filter_flow: "ፍሰት",
    act_filter_space: "ቦታ",
    act_filter_partner: "በማን ተመዘገበ",
    act_no_activities: "ምንም አይነት እንቅስቃሴ አልተገኘም",
    act_no_activities_sub: "እባክዎን ማጣሪያዎችን ዳግም ያስጀምሩ ወይም አዲስ የገንዘብ እንቅስቃሴ ይመዝግቡ።",
    act_delete_title: "በእርግጠኝነት ይጥፋ?",

    // Dream goals page
    goal_header_mono: "የወደፊት ህልማችን",
    goal_header_title: "የህልም ግቦች",
    goal_start_btn: "አዲስ የህልም ግብ ይጀምሩ",
    goal_modal_title: "የህልም ግብ ይጀምሩ",
    goal_name_label: "የህልሙ ስም",
    goal_name_placeholder: "ለምሳሌ፦ የድንገተኛ ጊዜ ቁጠባ፣ የልጅ ፈንድ፣ የቤት እቅድ",
    goal_target_label: "አስፈላጊው የብር መጠን",
    goal_category_label: "ምድብ",
    goal_deadline_label: "የመጨረሻው ቀን",
    goal_start_submit: "እቅዱን ጀምር 🪄",
    goal_add_savings_title: "ለህልማችን ገንዘብ እንጨምር",
    goal_add_savings_sub: "ገንዘቡን ከበጀትዎ ወይም ከገቢዎ ወደዚህ የቅዱስ ህልም ማጠራቀሚያ ውስጥ ያስተላልፉ!",
    goal_add_savings_amount: "ምን ያህል ብር ማስተላለፍ ይፈልጋሉ?",
    goal_add_savings_submit: "ገንዘቡን ህልሙ ውስጥ አስቀምጥ 💖",
    goal_total_title: "አጠቃላይ የህልም ጥንካሬ",
    goal_total_saved: "ተቆጥቧል",
    goal_total_across: "{num} ከታለሙ የህልም ግቦች ውስጥ",
    goal_no_goals: "እስካሁን ምንም አይነት የተቀረጸ ህልም የለም!",
    goal_no_goals_sub: "ለልጆች መወለጃ ቁጠባም ይሁን፣ ቤት ወይም መኪና ለመግዛት፣ ወይም የአደጋ ጊዜ ፈንድ ለመገንባት፣ ዛሬውኑ መጓዝ እንጀምር!",
    goal_no_goals_btn: "የመጀመሪያዎን የህልም ግብ ይክፈቱ!",
    goal_saved_percent: "{percent}% ተቆጥቧል",
    goal_future_quote: "የፍቅራችን የወደፊት ጎጆ",
    goal_celebration_title: "ህልማችን ተሳክቷል! 🏆",
    goal_celebration_sub: "ግብ ተደርሷል! 🎉",
    goal_celebration_desc: "ሁለታችሁም በፍጹም ፍቅርና አንድነት በመተባበር {amount} ብር ማጠራቀም ችላችኋል።",
    goal_celebration_quote: "“አብረን የምንራመደው እያንዳንዱ እርምጃ ፍቅራችንን ያጠናክራል። ቀጣዩን ህልማችንን አብረን እንጀምር!”",
    goal_celebration_btn: "እንኳን ደስ ያላችሁ! ወደ ቀጣዩ ጉዞ 🚀",

    // Monthly summary page
    sum_header_mono: "የወርሃዊ ሪፖርት",
    sum_header_title: "የወርሃዊ ማጠቃለያ",
    sum_shared_steps: "በዚህ ወር የተጓዝነው የጋራ እርምጃዎች",
    sum_spent_chart_title: "ገንዘባችን የት ሄደ?",
    sum_spent_chart_right: "የወጣ ብር",
    sum_spent_no_chart: "እንደነዚህ ያሉ ውብ ገበታዎችን ለማየት እባክዎን የወጪ እንቅስቃሴዎችን ይመዝግቡ! 📊",
    sum_ai_banner: "የየኛ ስማርት AI የገንዘብ ምክሮች",
    sum_ai_footer: "“የሀበሻ አንድነት ፍጹም በረከትን ይሰጣል። በደረጃችን ላይ ደረጃ በደረጃ እጅ ለእጅ ተያይዘን እንውጣ! 🇪🇹”",

    // Updates page
    updates_mono: "የቅርብ ጊዜ መልዕክቶች",
    updates_title: "የቅርብ ጊዜ መልዕክቶች",
    updates_clear_all: "ሁሉንም አጽዳ",
    updates_empty_title: "ሁሉም ነገር ሰላማዊ ነው",
    updates_empty_desc: "በወጪ ገደቦችዎ፣ በህልም ግቦችዎ ወይም በpartner የገንዘብ ምዝገባዎች ላይ አዲስ መረጃዎች ሲኖሩ እዚህ ይገለጻሉ!",

    // Settings page
    sett_mono: "የኛ አካውንት",
    sett_title: "አጠቃላይ ቅንብሮች",
    sett_profile_details: "የመለያዬ ዝርዝር",
    sett_edit_name: "ስምህን ያስተካክሉ",
    sett_sync_code: "የጥንድ ማመሳሰያ ኮድ (ማጣመሪያ)",
    sett_sync_desc: "💡 ተመሳሳይ ኮድ (ለምሳሌ፦ AMHARIC) በማስገባት የሁለታችሁንም ስልክ አመሳስሉ።",
    sett_adjust_btn: "መገለጫዬን አስተካክልና ጥንድ አድርግ 💖",
    sett_team_agreement: "የጋራ ብልህ ህጎቻችን",
    sett_team_li1: "ሁሉንም አይነት ወጪዎች በታማኝነት በመመዝገብ እርስ በእርስ ግልጽ ለመሆን እንስማማለን።",
    sett_team_li2: "በጋራ ህልሞቻችን ላይ የምናደርገውን ጉዞ ሁልጊዜ ለማገዝ ቃል እንገባለን።",
    sett_team_li3: "አንወነጃጀልም፤ እንረዳዳለን እንዲሁም አብረን በደረጃው ላይ እንወጣለን።",
    sett_sys_controls: "የስርዓት መቆጣጠሪያዎች",
    sett_clear_db: "አካባቢያዊ ዳታቤዙን አጽዳ",
    sett_clear_db_desc: "ሁሉንም በእጅዎ ያስቀመጧቸውን መረጃዎች በመሰረዝ ወደ ቀደመው የአብነት ማሳያ ይመለሱ።",
    sett_logout: "ከመለያዎ ውጣ",
    sett_logout_desc: "በዚህ ስልክ ላይ ያለዎትን የአሁኑን ክፍለ-ጊዜ በሰላም ያጠናቁ።",
    sett_logout_btn: "ውጣ",
    sett_language_sec: "የቋንቋ ምርጫ (Language)",
    sett_language_desc: "በእንግሊዝኛ እና በአማርኛ መካከል በቅጽበት ይቀያይሩ።",

    // Add activity modal
    modal_header: "አዲስ የገንዘብ እንቅስቃሴ",
    modal_sub: "ለጋራ ፋይናንሳችን አዲስ ፍቅር እንጨምርለት",
    modal_act_type: "የእንቅስቃሴው አይነት",
    modal_birr_amount: "የብር መጠን",
    modal_scope_label: "የገንዘቡ ባለቤትነት ቦታ?",
    modal_attribute_label: "አቅራቢው ማን ነው?",
    modal_note_label: "የፍቅር ማስታወሻ / ዝርዝር መግለጫ",
    modal_note_placeholder: "ለምሳሌ፦ ለሷ ጽጌረዳ ገዛሁላት 🌹 ፣ ለኛ ሻይ ጠጣን ☕",
    modal_submit_out: "ወጪውን ይመዝግቡ",
    modal_submit_in: "ገቢውን ይመዝግቡ",
  }
};

/**
 * Helper to get the correct category word based on current language
 */
export function getTranslatedCategory(catName: string, lang: Language): string {
  const dictionary = TRANSLATIONS[lang];
  switch (catName) {
    case 'Food': return dictionary.cat_food;
    case 'Transport': return dictionary.cat_transport;
    case 'Shopping': return dictionary.cat_shopping;
    case 'Rent': return dictionary.cat_rent;
    case 'Internet': return dictionary.cat_internet;
    case 'Entertainment': return dictionary.cat_entertainment;
    case 'Gifts': return dictionary.cat_gifts;
    case 'Bills': return dictionary.cat_bills;
    case 'Healthcare': return dictionary.cat_healthcare;
    case 'Emergency': return dictionary.cat_emergency;
    case 'Other': return dictionary.cat_other;
    default: return catName;
  }
}
