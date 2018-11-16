with open('datadump.sql') as d:
    s = d.read()
    s = s.replace("utf8mb4_0900_ai_ci", "utf8_general_ci")
    s = s.replace("utf8mb4", "utf8")
    with open('ta.sql', 'w+') as e:
        e.write(s)
