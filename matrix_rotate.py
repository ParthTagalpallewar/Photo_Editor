def rotate_point(x, y, angle_degrees):
    angle_radians = math.radians(angle_degrees)
    x_rotated = x * math.cos(angle_radians) - y * math.sin(angle_radians)
    y_rotated = x * math.sin(angle_radians) + y * math.cos(angle_radians)
    return x_rotated, y_rotated

def rotate_matrix(matrix, angle_degrees):
    rows, cols = len(matrix), len(matrix[0])
    rotated_matrix = [[0] * cols for _ in range(rows)]

    for i in range(rows):
        for j in range(cols):
            x_rotated, y_rotated = rotate_point(i, j, angle_degrees)
            
            # Adjust for potential fractional coordinates
            x_rounded, y_rounded = round(x_rotated), round(y_rotated)

            if 0 <= x_rounded < rows and 0 <= y_rounded < cols:
                rotated_matrix[x_rounded][y_rounded] = matrix[i][j]

    return rotated_matrix

# Example usage:
original_matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

angle_to_rotate = 20
rotated_matrix = rotate_matrix(original_matrix, angle_to_rotate)

# Print the rotated matrix
for row in rotated_matrix:
    print(row)